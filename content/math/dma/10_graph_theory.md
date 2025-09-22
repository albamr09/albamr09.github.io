---
title: Theory of Graphs and Trees
weight: 10
type: docs
math: true
---

## Trails, Paths and Circuits

The subject of graph theory began in the year 1736 when the great mathematician [Leonhard Euler](https://wikipedia.org/wiki/Leonhard_Euler) published a paper giving the solution to the following puzzle:

> The town of Königsberg in Prussia was built at a point where two branches of the Pregel River came together. It consisted of an island and some land along the river banks. These were connected by seven bridges as shown in the following Figure.
>
> ![Seven Bridges](./assets/seven_bridges.png)
>
> The question is this: Is it possible for a person to take a walk around town, starting and ending at the same location and crossing each of the seven bridges exactly once?

To solve this puzzle, Euler translated it into a graph theory problem. He noticed that all points of a given land mass can be identified with each other since a person can travel from any one point to any other point of the same land mass without crossing a bridge. Thus for the purpose of solving the puzzle, the map of Königsberg can be identified with the graph shown in the next Figure, in which the vertices $A$, $B$, $C$, and $D$ represent land masses and the seven edges represent the seven bridges.

![Seven Bridges Graph](./assets/seven_bridges_graph.png)

In terms of this graph, the question becomes the following:

> Is it possible to find a route through the graph that starts and ends at some vertex, one of $A$, $B$, $C$, or $D$, and traverses each edge exactly once?

Equivalently:

> Is it possible to trace this entire graph, starting and ending at the same point, without either ever lifting your pencil from the paper or crossing an edge more than once?

If it is possible to find a route that uses all the edges of the graph and starts and ends at $A$, then the total number of arrivals and departures from each vertex $B$, $C$, and $D$ must be a multiple of $2$. Or, in other words, the degrees of the vertices $B$, $C$, and $D$ must be even. But they are not: $\text{deg}(B) = 5$, $\text{deg}(C) = 3$, and $\text{deg}(D) = 3$. Hence there is no route that solves the puzzle by starting and ending at $A$.

> [!NOTE] **A Walk on a Graph**
>
> Let $G$ be a graph, and let $v$ and $w$ be vertices in $G$
>
> A **walk from $v$ to $w$** is a finite sequence of adjacent vertices and edges of $G$.
>
> The **trivial walk from $v$ to $v$** consists of the single vertex $v$.

> [!TIP] **Special Walks on a Graph**
>
> Let $G$ be a graph, and let $v$ and $w$ be vertices in $G$
>
> - A **trail from $v$ to $w$** is a walk from $v$ to $w$ that does not contain a repeated edge.
> - A **path from $v$ to $w$** is a trail that does not contain a repeated vertex.
> - A **closed walk** is a walk that starts and ends at the same vertex.
> - A **circuit** is a closed walk that contains at least one edge and does not contain a repeated edge.
> - A **simple circuit** is a circuit that does not have any other repeated vertex except the first and last.

### Subgraphs

> [!NOTE] **Subgraph**
>
> A graph $H$ is said to be a **subgraph** of a graph $G$ if, and only if, every vertex in $H$ is also a vertex in $G$, and every edge in $H$ is also an edge in $G$, and every edge in $H$ has the same endpoints as it has in $G$.

### Connectedness

Roughly speaking, a graph is connected if it is possible to travel from any vertex to any other vertex along a sequence of adjacent edges of the graph.

> [!NOTE] **Connectedness**
>
> Let $G$ be a grpah. Two **vertices $v$ and $w$ of $G$ are connected** if, and only if, there is a walk from $v$ to $w$.
>
> The **graph $G$ is connected** if, and only if, given any two vertices $v$ and $w$ in $G$, there is a walk from $v$ to $w$.

From the previous definitions, a graph $G$ is **not connected** if, and only if, there exist two vertices of $G$ that are not connected by any walk.

> [!TIP] **Facts on Connectedness and Circuits**
>
> Let $G$ be a graph.
>
> 1. If $G$ is connected, then any two distinct vertices of $G$ can be connected by a path.
> 2. If vertices $v$ and $w$ are part of a circuit in $G$, and one edge is removed from the circuit, then there still exists a trail from $v$ to $w$ in $G$.
> 3. If $G$ is connected and $G$ contains a circuit, then an edge of the circuit ca be removed without disconnecting $G$.

A **connected component** of a graph is a connected subgraph of largest possible size.

> [!NOTE] **Connected Component**
>
> A graph $H$ is a **connected component** of a graph $G$ if, and only if,
>
> 1. $H$ is a subgraph of $G$;
> 2. $H$ is connected, and
> 3. no connected subgraph of $G$ has $H$ as a subgraph and contains vertices or edges that are not in $H$.

### Euler Circuits

Now we return to consider general problems similar to the puzzle of the Königsberg bridges.

> [!NOTE] **Euler Circuit**
>
> Let $G$ be a graph. An **Euler circuit** for $G$ is a circuit that contains every vertex and every edge of $G$.
>
> It is a sequence of adjacent vertices and edges in $G$ that has at least one ede, starts and ends at the same vertex, uses every vertex of $G$ at least once, and uses every edge of $G$ exactly once.

The analysis used earlier to solve the puzzle of the Königsberg bridges generalizes to prove the following theorem:

> [!NOTE] **Existence of an Euler Circuit on a Graph**
>
> If a graph has an Euler circuit, then every vertex of the graph has positive even degree.

**Proof**. Suppose $G$ is a graph that has an Euler circuit. Let $v$ be any particular but arbitrarily chosen vertex of $G$. Since the Euler circuit contains every edge of $G$, it contains all edges incident on $v$.

Now imagine taking a journey that begins in the middle of one of the edges adjacent to the start of the Euler circuit and continues around the Euler circuit to end in the middle of the starting edge (see the following Figure).

![Euler Circuit Proof](./assets/euler_circuit_proof_1.png)

Each time $v$ is entered by traveling along one edge, it is inmmediately exited by traveling along another edge (since the journey ends in the middle of an edge).

Because the Euler circuit uses every edge of G exactly once, every edge incident on $v$ is traversed exactly once in this process. Hence the edges incident on $v$ occur in entry/exit pairs, and consequently the degree of $v$ must be a positive multiple of $2$. That means that $v$ has positive even degree as was to be shown.

The contrapositive states the following:

> [!NOTE] **Non-existence of an Euler Circuit on a Graph**
>
> If some vertex of a graph has odd degree, then the graph does not have an Euler circuit.

Now consider the converse:

> If every vertex of a graph has even degree, then the graph has an Euler circuit. Is this true? **The answer is no**.

The illustration below shows one example:

![Non-Euler Circuit](./assets/euler_circuit_proof_2.png)

Note that the graph in the preceding drawing is not connected. It turns out that although the converse is false, a modified converse is true.

> [!NOTE] **Existence of an Euler Circuit on a Graph**
>
> If a graph $G$ is connected and the degree of every vertex of $G$ is a positive even integer, then $G$ has an Euler circuit.

**Proof**. Suppose that $G$ is any connected graph and suppose that every vertex of $G$ is a positive even integer. Construct a circuit $C$ by the following algorithm:

1. Pick any vertex $v$ of $G$ at which to start.
2. Pick any sequence of adjacent vertices and edges, starting and ending at $v$ and never repeating and edge. Call the resulting circuit $C$. This step can be performed for the following reasons: Since the degree of each vertex of $G$ is a positive even integer, as each vertex of $G$ is entered by traveling on one edge, either the vertex is $v$ itself and there is no other unused edge adjacent to $v$, or the vertex can be exited by traveling on another previously unused edge. Since the number of edges of the graph is finite (by definition of graph), the sequence of distinct edges cannot go on forever. The sequence eventually returns to $v$ because the degree of $v$ is a positive even integer, and so each time an edge leads out from $v$ to another vertex, there must be a different edge that connects back in to $v$.
3. Check whether $C$ contains every edge and vertex of $G$. If so, $C$ is an Euler circuit, and we are finished. If not, permform the following steps:
   - Remove all edges of $C$ from $G$ and also any vertices that become isolated when the edges of $C$ are removed. Call the resulting subgraph $G'$ (Note that $G'$ may not be connected, but every vertex of $G'$ has positive event degree, since removing the edges of $C$ removes an even number of edges from each vertex, the difference of two even integers is even, and isolated vertices with degree $0$ were removed).
   - Pick any vertex $w$ common to both $C$ and $G'$

     ![Euler Circuit](./assets/euler_circuit_proof_3.png)

   - Pick any sequence of adjacent vertices and edges of $G'$, starting and ending at $w$ and never repeating an edge. Call the resulting circuit $C'$.
   - Patch $C$ and $C'$ together to create a new circuit $C''$ as follows
     - Start at $v$ and following $C$ all the way to $w$.
     - Then follow $C'$ all the way back to $w$.
     - Contninue along the untraveled portion of $C$ to return to $v$.

   ![Euler Circuit](./assets/euler_circuit_proof_4.png)
   - Let $C = C''$ and go back to step $3$

Since the graph $G$ is finite, execution of the steps outlined in this algorithm must eventually terminate. At that point an Euler circuit for $G$ will have been constructed.

> [!NOTE] **Characterization of Graphs that have Euler Circuits**
>
> A graph $G$ has an Euler circuit if, and only if, $G$ is connected and every vertex of $G$ has positive even degree.

A corollary to the previous theorem gives a criterion for determining when it is possible to find a walk from one vertex of a graph to another.

> [!NOTE] **Euler Trail**
>
> Let $G$ be a graph and let $v$ and $w$ be two distinct vertices of $G$. An **Euler trail from $v$ to $w$** is a sequence of adjacent edges and vertices that starts at $v$, ends at $w$, passes through every vertex of $G$ at least once and traverses every edge of $G$ exactly once.

> [!TIP] **Existence of an Euler Trail**
>
> Let $G$ be a graph, and let $v$ and $w$ be two distinct vertices of $G$. There is an Euler trail from $v$ to $w$ if, and only if, $G$ is connected, $v$ and $w$ have odd degree, and all other vertices of $G$ have positive even degree.

### Hamiltonian Circuits

We have answered this question: Given a graph $G$, is it possible to find a circuit for $G$ in which all the edges of $G$ appear exactly once? A related question is this: Given a graph $G$, is it possible to find a circuit for $G$ in which all the vertices of $G$ (except the first and the last) appear exactly once?

In 1859 the Irish mathematician [Sir William Rowan Hamilton](https://wikipedia.org/wiki/William_Rowan_Hamilton) introduced a puzzle in the shape of a dodecahedron. Each vertex was labeled with the name of a city—London, Paris, Hong Kong, New York, and so on. The problem Hamilton posed was to start at one city and tour the world by visiting each other city exactly once and returning to the starting city. One way to solve the puzzle is to imagine the surface of the dodecahedron stretched out and laid flat in the plane, as follows:

![Hamilton Problem](./assets/hamilton_problem.png)

> [!NOTE] **Hamiltonian Circuit**
>
> Given a graph $G$, a **Hamiltonian circuit** for $G$ is a simple circuit that includes every vertex of $G$.
>
> That is, a Hamiltonian circuit for $G$ is a sequence of adjacent vertices and distinct edges in which every vertex of $G$ appears exactly once, except for the first and the last, which are the same.

> [!TIP] **Hamiltonian Circuit as a Subgraph**
>
> If a graph $G$ has a Hamiltonian circuit, then $G$ has a subgraph $H$ with the following properties
>
> - $H$ contains every vertex of $G$
> - $H$ is connected
> - $H$ has the same number of edges as vertices
> - Every vertex of $H$ has degree $2$

The contrapositive of the previous statement says: if a graph $G$ does not have a subgraph $H$ with properties $(1)-(4)$, then $G$ does not have a Hamiltonian circuit.

### A Traveling Salesman Problem

Imagine that the drawing below is a map showing four cities and the distances in kilometers between them. Suppose that a salesman must travel to each city exactly once, starting and ending in city $A$. Which route from city to city will minimize the total distance that must be traveled?

![Traveling Salesman Problem](./assets/traveling_salesman_problem.png)

The general traveling salesman problem involves finding a Hamiltonian circuit to minimize the total distance traveled for an arbitrary graph with $n$ vertices in which each edge is marked with a distance.

One way to solve the general problem is to Write down all Hamiltonian circuits starting and ending at a particular vertex, compute the total distance for each, and pick one for which this total is minimal. However, even for medium-sized values of $n$ this method is impractical as it would take many and many years to complete.

At present, there is no known algorithm for solving the general traveling salesman problem that is more efficient. However, there are efficient algorithms that find “pretty good” solutions—that is, circuits that, while not necessarily having the least possible total distances, have smaller total distances than most other Hamiltonian circuits.

## Matrix Representation of Graphs

How can graphs be represented inside a computer? It happens that all the information needed to specify a graph can be conveyed by a structure called a matrix.

### Matrices

> [!NOTE] **Matrix**
>
> An $m \times n$ **matrix $A$ over a set $S$** is a rectangular array of elements of $S$ arranges into $m$ rows and $n$ columns:
>
> $$A = \begin{bmatrix} a_{11} & a_{12} & \cdots & a_{1n} \\ a_{21} & a_{22} & \cdots & a_{2n} \\ \vdots \\ a_{n1} & a_{n2} & \cdots & a_{nn} \end{bmatrix}$$
>
> We write $A = (a_{ij})$

If $A$ and $B$ are matrices, then $A = B$ if, and only if, $A$ and $B$ have the same size and the corresponding entries of $A$ and $B$ are all equal, that is

$$
a_{ij} = b_{ij} \text{ for every } i = 1, 2, \cdots m \text{ and } j = 1, 2, \cdots n
$$

A matrix for whitch the numbers of rows and columns are equal is called a **square matrix**.

If $A$ is a square matrix of size $n \times n$, then the **main diagonal of $A$** consists of all the entries $a_{11}, a_{22}, \cdots, a_{nn}$.

![Matrix Diagonal](./assets/matrix_diagonal.png)

### Matrices and Directed Graphs

> [!NOTE] **Adjacent Matrix over a Directed Graph**
>
> Let $G$ be a directed graph with ordered vertices $v_1, v_2, \cdots, v_n$. The **Adjacency matrix of $G$** is the $n \times n$ matrix $A = (a_{ij})$ over the set of nonnegative integers such that
>
> $$a_{ij} = \text{ the numbero of arrows from } v_i \text{ to } v_j \forall i,j = 1, 2, \cdots n$$

![Adjacency Matrix](./assets/adjacency_matrix.png)

Note that nonzero entries along the main diagonal of an adjacency matrix indicate the presence of loops, and off-diagonal entries larger than 1 correspond to parallel edges.

### Matrices and Undirected Graphs

> [!NOTE] **Adjacent Matrix over an Undirected Graph**
>
> Let $G$ be an undirected graph with ordered vertices $v_1, v_2, \cdots, v_n$. The **adjacency matrix of $G$** is the $n \times n$ matrix $A = (a_{ij})$ over the set of nonnegative integers such that
>
> $$a_{ij} = \text{ the number of edges connecting } v_i \text{ and } v_j$$
>
> for every $i, j = 1, 2, \cdots n$.

> [!NOTE] **Matrix Symmetry**
>
> An $n \times n$ square matrix $A = (a_{ij})$ is called **symmetric** if, and only if, for every $i, j = 1, 2, \cdots, n$
>
> $$a_{ij} = a_{ji}$$

It is easy to see that the matrix of any undirected graph is symmetric.

### Matrices and Connected Components

Consider a graph $G$, as shown below, that consists of several connected components.

![Connected Components](./assets/connected_components_1.png)

The adjacency matrix of $G$ is

![Connected Components](./assets/connected_components_2.png)

Which could also be written as:

![Connected Components](./assets/connected_components_3.png)

> [!NOTE] **Connected Components**
>
> Let $G$ be a graph with connected components $G_1, G_2, \cdots, G_k$. If there are $n_i$ vertices in each connected component $G_i$, and these vertices are numbered consecutively, then the adjacency matrix of $G$ has the form
>
> $$\begin{bmatrix} A_1 & O & O & \cdots & O & O \\ O & A_2 & O & \cdots & O & O \\ O & O & A_3 & \cdots & O & O \\ \vdots & \vdots & \vdots & & \vdots & \vdots \\ O & O & O & \cdots & O & A_k \end{bmatrix}$$
>
> where each $A_i$ is the $n_i \times n_i$ adjacency matrix of $G_k$ for every $i = 1, 2, cdots, k$ and the $O$'s represent matrices whose entries are all $0$.

### Matrix Multiplication

Matrix multiplication is an enormously useful operation that arises in many contexts, including the investigation of walks in graphs. Although matrix multiplication can be defined in quite abstract settings, the definition for matrices whose entries are real numbers will be sufficient for our applications.

> [!NOTE] **Scalar or Dot Product**
>
> Suppose that all entries in matrices $A$ and $B$ are real numbers. If the number of elements, $n$ in the $i$th row of $A$ equals the number of elements in the $j$th column of $B$, then the **scalar product** or **dot product** of the $i$th row of $A$ and the $j$th column of $B$ is the real number obtained as follows
>
> $$\begin{bmatrix} a_{i1} & a_{i2} & \cdots & a_{in} \end{bmatrix} \begin{bmatrix} b_{1j} \\ b_{2j} \\ \vdots \\ b_{nj}\end{bmatrix} = a_{i1}b_{1j} + a_{i2}b_{2j} + \cdots + a_{in}b_{nj}$$

More generally, if $A$ and $B$ are matrices, whose entries are real numbers and if $A$ and $B$ have **compatible sizes**, in the sense that the number of columns of $A$ equals the number of rows of $B$, then the product $AB$ is defined.

> [!NOTE] **Matrix Multiplication**
>
> Let $A = (a_{ij})$ be an $m \times k$ matrix and $B = (b_{ij})$ a $k \times n$ matrix, with real entries. The (matrix) product of $A$ times $B$, denoted $AB$, is that matrix $(c_{ij})$ defined as follows:
>
> $$\begin{bmatrix} a_{11} & a_{12} & \cdots & a_{1k} \\ \vdots \\ a_{m1} & a_{m2} & \cdots & a_{mk}\end{bmatrix} \begin{bmatrix} b_{11} & b_{12} & \cdots & b_{1n} \\ \vdots \\ b_{k1} & b_{k2} & \cdots & b_{kn}\end{bmatrix} = \\[5pt] \begin{bmatrix} c_{11} & c_{12} & \cdots & c_{1n} \\ \vdots \\ c_{m1} & c_{m2} & \cdots & c_{mn}\end{bmatrix}$$
>
> where
>
> $$c_{ij} = a_{i1}b_{1j} + \cdots + a_{ik}b_{kj} = \sum_{r = 1}^k a_{ir}b_{rj}$$
>
> for each $i = 1, 2, \cdots, m$ and $j = 1, 2, \cdots, n$.

Note that:

- Matrix multiplication is not commutative
- Matrix multiplication is associative

> [!NOTE] **Identity Matrix**
>
> For each positive integer $n$, the **$n \times n$ identity matrix**, denoted $I_n = (\delta_{ij})$, is the $n \times n$ matrix in which all the entries in the main diagonal are $1$'s and all other entires are $0$'s. In other words:
>
> $$\delta_{ij} = \begin{cases} 0 & \text{ if } i = j \\ 0 & \text{ if } i \neq j\end{cases}$$
>
> for every $i, j = 1, 2, \cdots, n$.

The German mathematician [Leopold Kronecker](https://wikipedia.org/wiki/Leopold_Kronecker) introduced the symbol $\delta_{ij}$ to make matrix computations more convenient. In his honor, this symbol is called the **Kronecker delta**.

> [!NOTE] **Power of a Matrix**
>
> For any $n \times n$ matrix $A$, the powers of $A$ are defined as follows:
>
> $$A^0 = I \text{, where } I \text{ is the } n \times n \text{ identity matrix }$$
>
> $$A^n = AA^{n - 1} \text{ for every integer } n \geq 1$$

### Counting Walks of Length $N$

A walk in a graph consists of an alternating sequence of vertices and edges. If repeated edges are counted each time they occur, then the number of edges in the sequence is called the **length of the walk**.

So, if $A$ is the adjacency matrix of a graph $G$, the $ij$-th entry of $A^2$ equals the number of walks of length $2$ connecting the $i$-th vertex to the $j$-th vertex of $G$. More generally, if $n$ is any positive integer, the $ij$-th entry of $A^n$ equals the number of walks of length $n$ connecting the $i$-th and the $j$-th vertices of $G$.

> [!NOTE] **Walks of Length $N$**
>
> If $G$ is a graph with vertices $v_1, v_2, \cdots, v_m$ and $A$ is the adjacency matrix of $G$, then for each positive integer $n$ and for all integers $i, j = 1, 2, \cdots, m$
>
> $$\text{ the } ij \text{th entry of } A^n = \text{ the number of walks of length } n \text{ from } v_i \text { to } v_j$$

**Proof** (by Mathematical Induction). Suppose $G$ is a graph with vertices $v_1, v_2, \cdots, v_m$ and $A$ is the adjacency matrix of $G$. Let $P(n)$ be the sentence:

> For all integers $i,j = 1, 2, \cdots, m$ the $ij$th entry of $A^n$ equals the number of walks of length $n$ from $v_i$ to $v_j$.

We will show that $P(n)$ is true for every integer $n \geq 1$.

**Show that $P(1)$ is true**:

The $ij$-th entry of $A^1$ is the $ij$-th entry of $A$. This equals the number of edges connecting from $v_i$ to $v_j$, which is the same as the number of walks of length $1$ from $v_i$ to $v_j$.

**Show that for every integer $k$ with $k \geq 1$, if $P(k)$ is true then $P(k + 1)$ is true**:

Let $k$ be any integer with $k \geq 1$, and suppose that

> For all integers $i,j = 1, 2, \cdots, m$ the $ij$th entry of $A^k$ equals the number of walks of length $k$ from $v_i$ to $v_j$.

We must show that

> For all integers $i,j = 1, 2, \cdots, m$ the $ij$th entry of $A^{k + 1}$ equals the number of walks of length $k + 1$ from $v_i$ to $v_j$.

Let $A = (a_{ij})$, and $A^k = (b_{ij})$. Since $A^{k + 1} = AA^k$, the $ij$th entry of $A^{k + 1}$, $c_{ij}$, is obtained by multiplying the $i$th row of $A$ by the $j$th column of $A^{k}$:

$$
c_{ij} = a_{i1}b_{1j} + \cdots + a_{im}b_{mj}
$$

for every $i, j = 1, 2, \cdots, m$. Now consider the individual terms of this sum: $a_i1$ is the number of edges from $v_i$ to $v_1$, and by the inductive hypothesis $b_{1j}$ is the number of walks of length $k$ from $v_1$ to $v_j$.

Any edge from $v_i$ to $v_1$ can be joined with any walk of length $k$ to create a walk of length $k + 1$ from $v_i$ to $v_j$, with $v_1$ as its second vertex. Thus, by the multiplication rule:

$$
a_{i1}b_{1j} = \begin{bmatrix} \text{ the number of walks of length } k + 1 \text{ from } \\ v_i \text{ to } v_j \text{ that have } v_1 \text{ as their second vertex} \end{bmatrix}
$$

More generally, for each integer $r = 1, 2, \cdots, m$

$$
a_{ir}b_{1r} = \begin{bmatrix} \text{ the number of walks of length } k + 1 \text{ from } \\ v_i \text{ to } v_j \text{ that have } v_r \text{ as their second vertex} \end{bmatrix}
$$

Because every walk of length $k + 1$ from $v_i$ to $v_j$ must have one of the vertices $v_1, v_2, \cdots, v_m$ as its second vertex, the total number of walks of length $k + 1$ from $v_i$ to $v_j$ equals the sum:

$$
a_{i1}b_{1j} + \cdots + a_{im}b_{mj}
$$

which equals the $ij$-th entry of $A^{k + 1}$. Hence

$$
\text{ the } ij \text{th entry of } A^{k + 1} = \text{ the number of walks of length } k + 1 \text{ from } v_i \text{ to } v_j
$$
