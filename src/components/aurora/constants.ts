
import * as THREE from 'three';

export const AURORA_COLORS = {
  color1: new THREE.Color(0x22c55e).multiplyScalar(2.0), // Even brighter green
  color2: new THREE.Color(0x8b5cf6).multiplyScalar(1.8), // Even brighter purple
  color3: new THREE.Color(0x0ea5e9).multiplyScalar(1.9), // Even brighter blue
};

export const RENDERER_CONFIG = {
  antialias: true,
  alpha: true,
  premultipliedAlpha: false,
} as const;

export const ANIMATION_SPEED = 0.003;
