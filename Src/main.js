class Atom {
    constructor(numProtons, numNeutrons, numElectrons) {
        const loader = new THREE.TextureLoader();
        const textureProton = loader.load('Textures/textureProton.png');
        const textureNeutron = loader.load('Textures/Neutron.png');
        const textureElectron = loader.load('Textures/Eletron.png');

        const ProtonTexture = new THREE.MeshBasicMaterial({map: textureProton});
        const NeutronTexture = new THREE.MeshBasicMaterial({map: textureNeutron});
        const ElectronTexture = new THREE.MeshBasicMaterial({map: textureElectron});

        const particleGeometry = new THREE.SphereGeometry(10, 100, 64);
        const separation = 15;
        this.protons = Array.from({length: numProtons}, (_, i) => {
            const proton = new THREE.Mesh(particleGeometry, ProtonTexture);
            proton.position.set(i * separation, 0, 0);
            scene.add(proton);
            return proton;
        });

        this.neutrons = Array.from({length: numNeutrons}, (_, i) => {
            const neutron = new THREE.Mesh(particleGeometry, NeutronTexture);
            neutron.position.set(i * separation, separation, 0);
            scene.add(neutron);
            return neutron;
        });

        const electronGeometry = new THREE.SphereGeometry(2, 100, 64);

        this.electrons = Array.from({length: numElectrons}, (_, i) => {
            const electron = new THREE.Mesh(electronGeometry, ElectronTexture);
            electron.position.set(40 * Math.cos(i * 2 * Math.PI / numElectrons), 40 * Math.sin(i * 2 * Math.PI / numElectrons), 1);
            scene.add(electron);
            return electron;
        });

        this.speed = 0.1;
        this.angle = Array(numElectrons).fill(0);
        this.hide();
    }

    hide() {
        this.isVisible = false;
        this.protons.forEach(proton => proton.visible = false);
        this.neutrons.forEach(neutron => neutron.visible = false);
        this.electrons.forEach(electron => electron.visible = false);
    }

    show() {
        this.isVisible = true;
        this.protons.forEach(proton => proton.visible = true);
        this.neutrons.forEach(neutron => neutron.visible = true);
        this.electrons.forEach(electron => electron.visible = true);
    }

    animate() {
        if (!this.isVisible) return;
        let centerX = 0, centerY = 0, centerZ = 0;
        for (const proton of this.protons) {
            proton.rotation.y += 0.03;
            centerX += proton.position.x;
            centerY += proton.position.y;
            centerZ += proton.position.z;
        }
        for (const neutron of this.neutrons) {
            neutron.rotation.y -= 0.03;
            centerX += neutron.position.x;
            centerY += neutron.position.y;
            centerZ += neutron.position.z;
        }
        centerX /= (this.protons.length + this.neutrons.length);
        centerY /= (this.protons.length + this.neutrons.length);
        centerZ /= (this.protons.length + this.neutrons.length);

        for (let i = 0; i < this.electrons.length; i++) {
            this.angle[i] += this.speed;
            const radius = 50;
            const phi = this.angle[i];
            const theta = i * Math.PI / 4;
            this.electrons[i].position.x = centerX + radius * Math.sin(phi) * Math.cos(theta);
            this.electrons[i].position.y = centerY + radius * Math.sin(phi) * Math.sin(theta);
            this.electrons[i].position.z = centerZ + radius * Math.cos(phi);
        }
    }
}


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 100;

const H1 = new Atom(1, 0, 1);
const H2 = new Atom(1, 1, 1);
const He = new Atom(2, 2, 2);

let animateId = null;

const animate = () => {
    H1.animate();
    H2.animate();
    He.animate();
    renderer.render(scene, camera);
    animateId = requestAnimationFrame(animate);
}

const ShowH1 = () => {
    if (animateId) cancelAnimationFrame(animateId);
    H2.hide();
    He.hide();
    H1.show();
    animate();
}

const ShowH2 = () => {
    if (animateId) cancelAnimationFrame(animateId);
    H1.hide();
    He.hide();
    H2.show();
    animate();
}

const ShowHe = () => {
    if (animateId) cancelAnimationFrame(animateId);
    H1.hide();
    H2.hide();
    He.show();
    animate();
}
animate();