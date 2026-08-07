import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { Satellite } from './satellites';

interface EarthCanvasProps {
  satellites: Satellite[];
  selectedId: string | null;
}

function latLonToVec3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

export default function EarthCanvas({ satellites, selectedId }: EarthCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<string | null>(null);
  const satMeshesRef = useRef<Map<string, THREE.Mesh>>(new Map());
  const haloRef = useRef<THREE.Mesh | null>(null);

  selectedRef.current = selectedId;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05070f);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0x445577, 1.2);
    scene.add(ambient);
    const dir = new THREE.DirectionalLight(0xffffff, 1.4);
    dir.position.set(5, 3, 5);
    scene.add(dir);

    // Earth sphere
    const earthRadius = 2.4;
    const earthGeo = new THREE.SphereGeometry(earthRadius, 48, 48);
    const earthMat = new THREE.MeshPhongMaterial({
      color: 0x1b3a5b,
      emissive: 0x0a1626,
      specular: 0x224466,
      shininess: 18,
    });
    const earth = new THREE.Mesh(earthGeo, earthMat);
    scene.add(earth);

    // Wireframe overlay for texture
    const wireGeo = new THREE.SphereGeometry(earthRadius * 1.001, 24, 16);
    const wireMat = new THREE.MeshBasicMaterial({ color: 0x2a6aa0, wireframe: true, transparent: true, opacity: 0.35 });
    const wire = new THREE.Mesh(wireGeo, wireMat);
    scene.add(wire);

    // Atmosphere glow
    const glowGeo = new THREE.SphereGeometry(earthRadius * 1.08, 48, 48);
    const glowMat = new THREE.MeshBasicMaterial({ color: 0x3a7bd5, transparent: true, opacity: 0.12, side: THREE.BackSide });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    scene.add(glow);

    // Stars
    const starGeo = new THREE.BufferGeometry();
    const starCount = 600;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 60 + Math.random() * 40;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      starPositions[i * 3] = r * Math.sin(p) * Math.cos(t);
      starPositions[i * 3 + 1] = r * Math.cos(p);
      starPositions[i * 3 + 2] = r * Math.sin(p) * Math.sin(t);
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.12, transparent: true, opacity: 0.8 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // Satellite markers
    const satMeshes = satMeshesRef.current;
    satMeshes.clear();
    const satGeo = new THREE.SphereGeometry(0.07, 12, 12);
    for (const sat of satellites) {
      const color =
        sat.status === 'active' ? 0x4ade80 : sat.status === 'standby' ? 0xfacc15 : 0xf87171;
      const mat = new THREE.MeshBasicMaterial({ color });
      const mesh = new THREE.Mesh(satGeo, mat);
      const pos = latLonToVec3(sat.latitude, sat.longitude, earthRadius * 1.18);
      mesh.position.copy(pos);
      mesh.userData.satId = sat.id;
      scene.add(mesh);
      satMeshes.set(sat.id, mesh);
    }

    // Selection halo (hidden until a satellite is selected)
    const haloGeo = new THREE.RingGeometry(0.14, 0.2, 32);
    const haloMat = new THREE.MeshBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.9, side: THREE.DoubleSide });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    halo.visible = false;
    scene.add(halo);
    haloRef.current = halo;

    let frame = 0;
    let rotating = true;
    let animId = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      frame++;
      if (rotating) {
        earth.rotation.y += 0.0016;
        wire.rotation.y += 0.0016;
        glow.rotation.y += 0.0016;
        stars.rotation.y += 0.0003;
      }
      // Keep satellite markers synced with earth rotation
      satMeshes.forEach((mesh) => {
        const sat = satellites.find((s) => s.id === mesh.userData.satId);
        if (!sat) return;
        const base = latLonToVec3(sat.latitude, sat.longitude, earthRadius * 1.18);
        base.applyAxisAngle(new THREE.Vector3(0, 1, 0), earth.rotation.y);
        mesh.position.copy(base);
      });
      // Position halo on selected satellite
      const selId = selectedRef.current;
      if (selId && satMeshes.has(selId)) {
        const target = satMeshes.get(selId)!;
        halo.position.copy(target.position);
        halo.lookAt(camera.position);
        const pulse = 1 + Math.sin(frame * 0.08) * 0.18;
        halo.scale.setScalar(pulse);
        halo.visible = true;
      } else {
        halo.visible = false;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Drag to rotate manually
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    let manualRotY = 0;
    let manualRotX = 0;
    const onDown = (e: PointerEvent) => {
      isDragging = true;
      rotating = false;
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      manualRotY += dx * 0.005;
      manualRotX += dy * 0.005;
      manualRotX = Math.max(-1.2, Math.min(1.2, manualRotX));
      earth.rotation.y += dx * 0.005;
      wire.rotation.y = earth.rotation.y;
      glow.rotation.y = earth.rotation.y;
      camera.position.y = Math.sin(manualRotX) * 9;
      camera.position.x = Math.sin(manualRotY) * 9;
      camera.position.z = Math.cos(manualRotY) * 9 * Math.cos(manualRotX);
      camera.lookAt(0, 0, 0);
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onUp = () => {
      isDragging = false;
    };
    renderer.domElement.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      renderer.domElement.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('resize', onResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      earthGeo.dispose();
      earthMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      glowGeo.dispose();
      glowMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      satGeo.dispose();
      haloGeo.dispose();
      haloMat.dispose();
    };
  }, [satellites]);

  return <div className="earth-canvas" ref={mountRef} />;
}
