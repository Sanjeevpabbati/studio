"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RotateCw } from 'lucide-react';
import { cn } from '@/lib/utils';
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
    const isAutoRotating = useRef(true);
    const autoRotateTimeout = useRef<NodeJS.Timeout>();

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
            if (isAutoRotating.current && cubeRef.current) {
                const rotationSpeed = (2 * Math.PI) / (4 * 60); // Full rotation in 4 seconds at 60fps
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
            if (autoRotateTimeout.current) clearTimeout(autoRotateTimeout.current);
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

    const handleManualAction = (action: () => void) => {
        action();
        isAutoRotating.current = false;
        if (autoRotateTimeout.current) clearTimeout(autoRotateTimeout.current);
        autoRotateTimeout.current = setTimeout(() => {
            isAutoRotating.current = true;
        }, 4000);
    };

    const handleRotation = (axis: 'x' | 'y', direction: number) => {
        handleManualAction(() => {
            if (cubeRef.current) {
                const rotationAmount = Math.PI / 4;
                cubeRef.current.rotation[axis] += rotationAmount * direction;
            }
        });
    };
    
    const resetRotation = () => {
        handleManualAction(() => {
            if (cubeRef.current) {
                cubeRef.current.rotation.set(0, 0, 0);
            }
        });
        // Instantly resume auto-rotation after reset
        if (autoRotateTimeout.current) clearTimeout(autoRotateTimeout.current);
        isAutoRotating.current = true;
    };

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

            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <Card className="bg-card/80 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Manual Controls</CardTitle>
                        <CardDescription>Rotate the cube or reset its position.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center gap-4">
                        <Button variant="outline" size="icon" aria-label="Rotate Left" onClick={() => handleRotation('y', 1)}>
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div className="flex flex-col gap-2">
                             <Button variant="outline" size="icon" aria-label="Rotate Up" onClick={() => handleRotation('x', 1)}>
                                <ArrowUp className="h-5 w-5" />
                            </Button>
                             <Button variant="outline" size="icon" aria-label="Rotate Down" onClick={() => handleRotation('x', -1)}>
                                <ArrowDown className="h-5 w-5" />
                            </Button>
                        </div>
                        <Button variant="outline" size="icon" aria-label="Rotate Right" onClick={() => handleRotation('y', -1)}>
                            <ArrowRight className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" aria-label="Reset Rotation" onClick={resetRotation}>
                            <RotateCw className="h-5 w-5 text-accent" />
                        </Button>
                    </CardContent>
                </Card>

                <Card className="bg-card/80 backdrop-blur-sm">
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
