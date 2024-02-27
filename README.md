# pathfinding-visualizer

Web app built with React that visualizes pathfinding algorithms

## Specific Todo-List

-   Re-rendering entire grid every frame is too slow, must keep track of which cells changed and render those specifically!!! (this will be challenging). At the same time, instead of sleeping after every step(), perform a certain number of steps and then wait on each re-render to perform the next batch

## General Todo-List

-   Improve code architecture (interactions between components, shared state, etc)
-   Improve controls (no undefined behavior from user inputs when they shouldn't occur such as during searching)
-   Improve performance
