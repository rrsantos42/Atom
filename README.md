# Atom Visualization Project

This project provides a simple visualization of different atoms using Three.js.

## How it works
This project is comprised of a single HTML file that contains the structure of the project and links to the necessary scripts. It relies on Three.js for rendering and animating the 3D objects that represent the atoms.

The project provides a basic visualization of three atoms: Hydrogen (H1), Deuterium (H2), and Helium (He2). Each atom is represented by protons, neutrons, and electrons that are appropriately positioned and animated.

The main.js file contains the script that sets up the Three.js scene, camera, and renderer. It also contains the definitions of the atoms, and the animations.

The Atom class (in Atom.js file) defines the structure and behavior of an atom. An atom is created by specifying the number of protons, neutrons, and electrons. It also includes methods for hiding and showing the atom, as well as animating it.

There are buttons in the HTML file that allow you to switch between the atoms. When a button is clicked, the current atom is hidden, the new atom is shown, and the animation starts.

## How to run
Clone the repository or download the files.
Open the index.html file in your browser. You should see the visualization of the Hydrogen atom, and buttons to switch to the other atoms.
Click on the buttons to switch between the atoms.
Dependencies
This project relies on Three.js, a cross-browser JavaScript library and Application Programming Interface (API) used to create and display animated 3D computer graphics in a web browser.

Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

### License
MIT
