---
title: Search
weight: 4
type: docs
math: true
---

## A\*

Consider a square grid having many obstacles and we are given a starting cell and a target cell. We want to reach the target cell (if possible) from the starting cell as quickly as possible.

What A\* Search Algorithm does is that at each step it picks the node according to a value $f = g + h(x,y)$, where $g$ is the current cost and $h(x,y)$ is the value of the heuristic function in cell $(x,y)$. That is h is the estimated movement cost to move from that given square on the grid to the final destination. This is often referred to as the heuristic, which is nothing but a kind of smart guess.

### Algorithm

```markdown
1.  let openList equal empty list of nodes
2.  let closedList equal empty list of nodes
3.  put startNode on the openList (leave it's f at zero)
4.  while openList is not empty
5.       let currentNode equal the node with the least f value
6.       remove currentNode from the openList
7.       add currentNode to the closedList
8.       if currentNode is the goal
9.           You've found the exit!
10.      let children of the currentNode equal the adjacent nodes
11.      for each child in the children
12.          if child is in the closedList
13.              continue to beginning of for loop
14.          child.g = currentNode.g + distance b/w child and current
15.          child.h = distance from child to end
16.          child.f = child.g + child.h
17.          if child.position is in the openList's nodes positions
18.              if child.g is higher than the openList node's g
19.                  continue to beginning of for loop
20.          add the child to the openList
```

## Dynamic Programming

Given a grid and a goal position, dynammic programming gives you the optimal action for each cell. Where the optimal action is to move to the direction that offers the lower distance to the goal.

To compute this distance we calculate:

$$
\begin{aligned}
f(x,y) = g = min_{x',y'} f(x', y') + 1
\end{aligned}
$$

That is, we obtain recursively the distance of each neighbour to the goal and we add one.
