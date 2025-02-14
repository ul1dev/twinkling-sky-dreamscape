
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const fragmentShader = `
  uniform float time;
  uniform vec3 color1;
  uniform vec3 color2;
  uniform vec3 color3;
  
  varying vec2 vUv;
  
  //
  // GLSL textureless classic 3D noise "cnoise",
  // with an RSL-style periodic variant "pnoise".
  // Author:  Stefan Gustavson (stefan.gustavson@liu.se)
  // Version: 2011-10-11
  //
  // Many thanks to Ian McEwan of Ashima Arts for the
  // ideas for permutation and gradient selection.
  //
  // Copyright (c) 2011 Stefan Gustavson. All rights reserved.
  // Distributed under the MIT license.
  //
  vec3 mod289(vec3 x)
  {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }

  vec4 mod289(vec4 x)
  {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }

  vec4 permute(vec4 x)
  {
    return mod289(((x*34.0)+1.0)*x);
  }

  vec4 taylorInvSqrt(vec4 r)
  {
    return 1.79284291400159 - 0.85373472095314 * r;
  }

  vec3 fade(vec3 t) {
    return t*t*t*(t*(t*6.0-15.0)+10.0);
  }

  float cnoise(vec3 P)
  {
    vec3 Pi0 = floor(P);
    vec3 Pi1 = Pi0 + vec3(1.0);
    Pi0 = mod289(Pi0);
    Pi1 = mod289(Pi1);
    vec3 Pf0 = fract(P);
    vec3 Pf1 = Pf0 - vec3(1.0);
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 * (1.0 / 7.0);
    vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 * (1.0 / 7.0);
    vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;

    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);

    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
    return 2.2 * n_xyz;
  }

  float createBand(vec2 uv, float offset) {
    float band = cnoise(vec3(uv.x * 3.0, uv.y * 2.0 + offset + time * 0.2, time * 0.1));
    band = smoothstep(0.1, 0.9, band + 0.5); // Create even sharper bands
    return band;
  }

  void main() {
    // Create multiple shimmering bands with more intensity
    float band1 = createBand(vUv, 0.0);
    float band2 = createBand(vUv + vec2(0.5, 2.0), 10.0);
    float band3 = createBand(vUv + vec2(-0.3, 1.0), 20.0);
    
    // Layer the bands with higher intensities
    float finalBand = band1 * 0.7 + band2 * 0.5 + band3 * 0.3;
    
    // Add stronger vertical falloff
    float verticalFalloff = smoothstep(0.0, 0.7, 1.0 - abs(vUv.y * 2.0 - 1.0));
    finalBand *= verticalFalloff;
    
    // Enhanced shimmer effect
    float shimmer = sin(time * 3.0 + vUv.x * 15.0) * 0.15 + 0.85;
    
    // Create color transitions with more vivid colors
    vec3 color = mix(color1, color2, finalBand);
    color = mix(color, color3, band2 * 0.7);
    
    // Apply enhanced shimmer and brightness variation
    float brightness = 1.2 + sin(time * 0.5) * 0.3;
    
    gl_FragColor = vec4(color * brightness * shimmer, finalBand * 0.9);
  }
`;

const vertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const AuroraEffect: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    // Initialize renderer with higher alpha
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      premultipliedAlpha: false
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create aurora material with more intense colors
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0x22c55e).multiplyScalar(2.0) }, // Even brighter green
        color2: { value: new THREE.Color(0x8b5cf6).multiplyScalar(1.8) }, // Even brighter purple
        color3: { value: new THREE.Color(0x0ea5e9).multiplyScalar(1.9) }, // Even brighter blue
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });
    materialRef.current = material;

    // Create plane geometry that fills the screen
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Animation loop with slower movement
    let animationFrameId: number;
    const animate = () => {
      if (materialRef.current) {
        materialRef.current.uniforms.time.value += 0.003; // Even slower for more natural movement
      }
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (rendererRef.current) {
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      if (containerRef.current?.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        opacity: 0.8, // Slightly reduce overall opacity to blend better with stars
      }} 
    />
  );
};

export default AuroraEffect;
