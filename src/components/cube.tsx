
"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";

const CUBE_STORAGE_KEY = 'indcric-cube-images';

const initialFaceImages = Array(6).fill('https://placehold.co/256x256.png');

export default function Cube() {
    const mountRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene>();
    const cameraRef = useRef<THREE.PerspectiveCamera>();
    const rendererRef = useRef<THREE.WebGLRenderer>();
    const cubeRef = useRef<THREE.Mesh>();
    const animationFrameId = useRef<number>();

    const [faceImages, setFaceImages] = useState<string[]>(initialFaceImages);
    const { toast } = useToast();

    useEffect(() => {
        try {
            const storedImages = localStorage.getItem(CUBE_STORAGE_KEY);
            if (storedImages) {
                const parsedImages = JSON.parse(storedImages);
                if (Array.isArray(parsedImages) && parsedImages.length === 6) {
                    setFaceImages(parsedImages);
                }
            }
        } catch (error) {
            console.error("Failed to load images from local storage:", error);
        }
    }, []);

    const updateTexture = useCallback((faceIndex: number, imageUrl: string) => {
        if (!cubeRef.current) return;
        const loader = new THREE.TextureLoader();
        loader.setCrossOrigin('');
        loader.load(imageUrl, (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace;
            const materials = cubeRef.current!.material as THREE.MeshStandardMaterial[];
            if (materials[faceIndex]) {
                materials[faceIndex].map = texture;
                materials[faceIndex].needsUpdate = true;
            }
        }, undefined, (error) => {
            console.error(`Failed to load texture for face ${faceIndex}:`, error);
             toast({
                variant: "destructive",
                title: "Texture Error",
                description: "Could not load image. Please try a different one.",
            });
        });
    }, [toast]);

    useEffect(() => {
        faceImages.forEach((imageUrl, index) => {
            if (imageUrl) {
                updateTexture(index, imageUrl);
            }
        });

        try {
            localStorage.setItem(CUBE_STORAGE_KEY, JSON.stringify(faceImages));
        } catch (error) {
            console.error("Failed to save images to local storage:", error);
        }
    }, [faceImages, updateTexture]);
    
    useEffect(() => {
        const currentMount = mountRef.current;
        if (!currentMount) return;

        sceneRef.current = new THREE.Scene();
        cameraRef.current = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        cameraRef.current.position.z = 2.8;

        rendererRef.current = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        rendererRef.current.setSize(currentMount.clientWidth, currentMount.clientHeight);
        rendererRef.current.setPixelRatio(window.devicePixelRatio);
        currentMount.appendChild(rendererRef.current.domElement);

        const geometry = new THREE.BoxGeometry(1.8, 1.8, 1.8);
        const materials = faceImages.map(() => new THREE.MeshStandardMaterial({
            color: 0xaaaaaa,
            metalness: 0.2,
            roughness: 0.8,
        }));
        
        cubeRef.current = new THREE.Mesh(geometry, materials);
        sceneRef.current.add(cubeRef.current);

        const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
        sceneRef.current.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
        directionalLight.position.set(2, 2, 5);
        sceneRef.current.add(directionalLight);

        const animate = () => {
            animationFrameId.current = requestAnimationFrame(animate);
            if (cubeRef.current) {
                cubeRef.current.rotation.y += 0.005;
                cubeRef.current.rotation.x += 0.002;
            }
            rendererRef.current!.render(sceneRef.current!, cameraRef.current!);
        };
        animate();

        const handleResize = () => {
            if (cameraRef.current && rendererRef.current && currentMount) {
                const { clientWidth, clientHeight } = currentMount;
                cameraRef.current.aspect = clientWidth / clientHeight;
                cameraRef.current.updateProjectionMatrix();
                rendererRef.current.setSize(clientWidth, clientHeight);
            }
        };
        window.addEventListener('resize', handleResize);
        
        faceImages.forEach((img, i) => updateTexture(i, img));

        return () => {
            if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
            window.removeEventListener('resize', handleResize);
            if(rendererRef.current) currentMount.removeChild(rendererRef.current.domElement);
            // Dispose Three.js objects to prevent memory leaks
            sceneRef.current?.clear();
            geometry.dispose();
            materials.forEach(material => material.dispose());
            rendererRef.current?.dispose();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageUrl = event.target?.result as string;
                setFaceImages(prev => {
                    const newImages = [...prev];
                    newImages[index] = imageUrl;
                    return newImages;
                });
            };
            reader.readAsDataURL(file);
        }
    };
    
    return (
        <div className="flex flex-col items-center gap-8">
            <Card className="w-full h-[300px] sm:h-[400px] md:h-[500px] p-0 overflow-hidden bg-primary/20 border-primary shadow-2xl shadow-accent/10">
                <div ref={mountRef} className="w-full h-full" data-ai-hint="3d render"></div>
            </Card>

            <div className="w-full flex justify-center">
                 <Card className="bg-card/80 backdrop-blur-sm w-full lg:max-w-md">
                    <CardHeader>
                        <CardTitle>Customize Faces</CardTitle>
                        <CardDescription>Upload an image for each face of the cube.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="space-y-2">
                                <Label htmlFor={`face-upload-${index}`} className="text-sm font-medium text-center block">
                                    Face {index + 1}
                                </Label>
                                <Input 
                                    id={`face-upload-${index}`} 
                                    type="file" 
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(e, index)}
                                    className="text-xs file:text-white file:bg-accent/80 file:hover:bg-accent file:rounded-md file:border-0 file:px-2 file:py-1 file:text-xs"
                                />
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
