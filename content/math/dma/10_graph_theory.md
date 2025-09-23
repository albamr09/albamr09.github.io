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

## Isomorphisms of Graphs

Two graphs that are the same except for the labeling of their vertices and edges are called **isomorphic**. The word isomorphism comes from the Greek, meaning "same form." Isomorphic graphs are those that **have essentially the same form**.

> [!NOTE] **Isomorphic Graphs**
>
> Let $G$ and $G'$ be graphs with vertex sets $V(G)$ and $V(G')$ and edge sets $E(G)$ and $E(G')$, repectively. **$G$ is isomorphic to $G'$** if, and only if, there exist one-to-one correspondences $g: V(G) \to V(G')$ and $h: E(G) \to E(G')$ that preserve the edge-endpoint functions of $G$ and $G'$ in the sense that for each $v \in V(G)$ and $e \in E(G)$
>
> $$v \text{ is an endpoint of } e \Leftrightarrow g(v) \text{ is an endpoint of } h(e)$$

In words, $G$ is isomorphic to $G'$ if, and only if, the vertices and edges of $G$ and $G'$ can be matched up by one-to-one, onto functions in such a way that the edges between corresponding vertices correspond to each other.

It is not hard to show that **graph isomorphism is an equivalence relation on a set of graphs**; in other words, it is reflexive, symmetric, and transitive.

> [!TIP] **Graph Isomorphism Is an Equivalence Relation**
>
> Let $S$ be a set of graphs and let $R$ be the relation of graph isomorphism on $S$. Then $R$ is an equivalence relation on $S$

**Proof**.

**$R$ is reflexive**: Given any graph $G$ is $S$, define a graph isomorphism from $G$ to $G$ by using the identify functions on the set of vertices and on the set of edges of $G$.

**$R$ is symmetric**: Given any graphs $G$ and $G'$ in $S$ such that $G$ is isomorphic to $G'$, we must show that $G'$ is isomorphic to $G$.

> This is true because if $g$ and $h$ are vertex and edge correspondences from $G$ to $G'$ that presere the edge-endpoint functions, then $g^{-1}$ and $h^{-1}$ are vertex and edge correspondences from $G'$ to $G$ that preserve the edge-endpoint functions.

**$R$ is transitive**: Given any graphs $G$, $G'$ and $G''$ in $S$ such that $G$ is isomorphic to $G'$ and $G'$ is isomorphic to $G''$, we must show that $G$ is isomorphic to $G''$.

> This follows from the fract that if $g_1$ and $h_1$ are vertex and edge correspondences from $G$ to $G'$ that preserve the edge-endpoint functions of $G$ And $G'$ and if $g_2$ and $h_2$ are vertex and edge correspondences from $G'$ to $G''$ that preserve the edge-endpoint functions of $G'$ and $G''$, then $g_2 \circ g_1$ and $h_2 \circ h_1$ are vertex and edge correspondences from $G$ to $G''$ that preserve the edge-endpiont function of $G$ and $G''$.

Now consider the question, "Is there a general method to determine whether graphs $G$ and $G'$ are isomorphic?" In other words, is there some algorithm that will accept graphs $G$ and $G'$ as input and produce a statement as to whether they are isomorphic? In fact, there is such an algorithm. It consists of generating all one-to-one, onto functions from the set of vertices of $G$ to the set of vertices of $G'$ and from the set of edges of $G$ to the set of edges of $G'$ and checking each pair to determine whether it preserves the edge-endpoint functions of $G$ and $G'$. The problem with this algorithm is that it takes an unreasonably long time to perform.

If $G$ and $G'$ each have $n$ vertices and $m$ edges, the number of one-to-one correspondences from vertices to vertices is $n!$ and the number of one-to-one correspondences from edges to edges is $m!$, so the total number of pairs of functions to check is $n! \cdot m!$.

However, there are some simple tests that can be used to show that certain pairs of graphs are not isomorphic. For instance, if two graphs are isomorphic, then they have the same number of vertices (because there is a one-to-one correspondence from the vertex set of one graph to the vertex set of the other). More generally, a property that is preserved by graph isomorphism is called **an isomorphic invariant**.

> [!NOTE] **Isomorphic Invariant Property**
>
> A property $P$ is called an **invariant for graph isomorphism** if, and only if, given any graphs $G$ and $G'$, if $G$ has property $P$ and $G'$ is isomorphic to $G$, then $G'$ has property $P$.

> [!TIP] **Examples of Isomorphic Invariant Properties**
>
> Each of the following properties is an invariant for graph isomorphism, where $n, m$ and $k$ are all nonnegative integers:
>
> 1. has $n$ vertices
> 2. has $m$ edges
> 3. has a vertex of degree $k$
> 4. has $m$ vertices of degree $k$
> 5. has a circuit of length $k$
> 6. has a simple circuit of length $k$
> 7. has $m$ simple circuits of length $k$
> 8. is connected
> 9. has an [Euler circuit](#euler-circuits)
> 10. has a [Hamiltonian circuit](#hamiltonian-circuits)

### Graph Isomorphism for Simple Graphs

When graphs $G$ and $G'$ are both simple, the definition of $G$ being isomorphic to $G'$ can be written without referring to the correspondence between the edges of $G$ and the edges of $G'$.

> [!NOTE] **Graph Isomorphism for Simple Graphs**
>
> If $G$ and $G'$ are simple graphs, then **$G$ is isomorphic to $G'$** if, and only if, there exists a one-to-one correspondence $g$ from the vertex set $V(G)$ of $G$ to the vertex set $V(G')$ of $G'$ that preserves the edge-endpoint functions of $G$ and $G'$ in the ses that for all vertices $u$ and $v$ of $G$
>
> $$\{u, v\} \text{ is an edge in } G \Leftrightarrow \{g(u), g(v)\} \text{ is an edge in } G'$$

## Trees: Examples and Basic Properties

In mathematics, a tree is a connected graph that does not contain any circuits.

> [!NOTE] **Tree**
>
> A graph is said to be **circuit-free** if, and only if, it has no circuits. A graph is called a **tree** if, and only if, it is circuit-free and connected.

A **trivial tree** is a graph that consists of a single vertex.

> [!NOTE] **Forest**
>
> A graph is called a **forest** if, and only if, it is circuit-free and not connected.

On the following image we illustrate an example where mathematical trees are used. To be more concrete we show a **decision tree**:

![Decision Tree](./assets/decision_tree.png)

### A Parse Tree

In the last 30 years, [Noam Chomsky](https://wikipedia.org/wiki/Noam_Chomsky) and others have developed new ways to describe the syntax (or grammatical structure) of natural languages such as English. This work has proved useful in constructing compilers for high-level computer languages. In the study of grammars, trees are often used to show the derivation of grammatically correct sentences from certain basic rules. Such trees are called syntactic **derivation trees or parse trees**.

The rules of a grammar are called **productions**. It is customary to express them using the shorthand notation illustrated below. This notation, introduced by [John Backus](https://wikipedia.org/wiki/John_Backus) in 1959 and modified by [Peter Naur](https://wikipedia.org/wiki/Peter_Naur) in 1960, was used to describe the computer language Algol and is called **the Backus–Naur notation**. In the notation, the symbol $|$ represents the word or, and angle brackets $\langle \rangle$ are used to enclose terms to be defined.

![Example of a Grammar](./assets/grammar_example.png)

The derivation of the sentence “The young man caught the ball” from the above rules is described by the tree shown below.

![Parse Tree Example](./assets/parse_tree_example.png)

### Characterizing Trees

There is a somewhat surprising relation between the number of vertices and the number of edges of a tree. It turns out that if $n$ is a positive integer, then any tree with $n$ vertices (no matter what its shape) has $n - 1$ edges.

Perhaps even more surprisingly, a partial converse to this fact is also true. Any connected graph with $n$ vertices and $n - 1$ edges is a tree. It follows from these facts that if even one new edge (but no new vertex) is added to a tree, the resulting graph must contain a circuit.

Also, from the fact that removing an edge from a circuit does not disconnect a graph, it can be shown that every connected graph has a subgraph that is a tree. It follows that if $n$ is a positive integer, any graph with $n$ vertices and fewer than $n - 1$ edges is not connected.

> [!NOTE] **Terminal or Leaf Vertex**
>
> Let $T$ be a tree. If $T$ has at least two vertices, then a vertex of degree $1$ in $T$ is called a **leaf** (or a **terminal vertex**). The unique vertex in a trivial tree is also called a **leaf** or **terminal vertex**.

> [!NOTE] **Internal or Branch Vertex**
>
> Let $T$ be a tree. If $T$ has at least two vertices, then a vertex of degree greater than $1$ in $T$ is called an **internal vertex** (or a **branch vertex**).

> [!TIP] **Number of Vertices and Edges on a Tree**
>
> For any positive integer $n$, any tree with $n$ vertices has $n - 1$ edges.

**Proof** (by mathematical induction).

Let the property $P(n)$ be the sentence

> Any tree with $n$ vertices has $n - 1$ edges.

We use mathematical induction to show that this property is true for every integer with $n \geq 1$.

**Show that $P(1)$ is true**: Let $T$ be any tree with one vertex. Then $T$ has zero edges. Since $0 = 1 - 1$ then $P(1)$ is true.

**Show that for every integer $k \geq 1$, if $P(k)$ is true then $P(k + 1)$ is true**. Suppose $k$ is any positive integer for which $P(k)$ is true. In other words, suppose that

> Any tree with $k$ vertices has $k - 1$ edges.

We mush show that $P(k + 1)$ is true. In other words, we must show that

> Any tree with $k + 1$ vertices has $(k + 1) - 1 = k$ edges.

Let $T$ be a particular but arbitrarily chosen tree with $k + 1$ vertices. Since $k$ is a positive integer, $(k + 1) \geq 2$, and so $T$ has more than one vertex.

Since any tree that has more than one vertex has at least one vertex of degree $1$, $T$ must have a vertex $v$ of degree $1$. Also, since $T$ has more than one vertex, there is at least one other vertex in $T$ besides $v$. Thus there is an edge $e$ connecting $v$ to the rest of $T$.

Define a subgraph $T'$ of $T$ so that

$$
V(T') = V(T) - \{v\} \text{ and } E(T') = E(T) - \{e\}
$$

Then

1. The number of vertices of $T'$ is $(k + 1) - 1 = k$
2. $T'$ is circuit free, since $T$ is circuit free and removing an edge and a vertex cannot create a circuit
3. $T'$ is connected

Hence, by the definition of tree, $T'$ is a tree. Since $T'$ has $k$ vertices, by inductive hypothesis the number of edges of $T'$ is $k - 1$.

It follows that the number of edges of $T$ is the number of edges of $T'$ plus the edge we removed:

$$
\text{ the number of edges of } T' + 1 = k - 1 + 1 = k
$$

This is what was to be shown.

> [!TIP] **Connectivity and Circuits**
>
> If $G$ is any connected graph, $C$ is any circuit in $G$, and any one of the edges of $C$ is removed from $G$, then the graph that remains is connected.

**Proof**. Suppose $G$ is a connected graph, $C$ is a circuit in $G$ and $e$ is an edge of $C$. Form a subgraph $G'$ of $G$ by removing $e$ from $G$. Thus

$$
V(G') = V(G) \\[5pt]
E(G') = E(G) - \{e\}
$$

We must show that $G'$ is connected. Suppose $u$ and $w$ are any two vertices of $G'$. Since the vertex sets of $G$ and $G'$ are the same, because $u$ and $w$ are both vertices of $G$ and since $G$ is connected, there is a walk $W$ in $G$ from $u$ to $w$.

**Case 1 ($e$ is not an edge of $W$)**: The only edge in $G$ that is not in $G'$ is $e$, so in this case $W$ is also a walk in $G'$. Hence $u$ is connected to $w$ by a walk in $G'$.

**Case 2 ($e$ is an edge of $W$)**: In this case the walk $W$ from $u$ to $w$ includes a section of the circuit $C$ that contains $e$. Let $C$ be denoted as follows

$$
C: v_0e_1v_1e_2v_2\cdots e_nv_n(=v_0)
$$

Now $e$ is one of the edges of $C$, so, to be specific, let $e = e_k$. Then the walk $W$ contains either the sequence

$$
v_{k - 1}e_kv_k \text{ or } v_ke_kv_{k - 1}
$$

If $W$ contains $v_{k - 1}e_kv_k$, connect $v_k{k - 1}$ to $v_k$ by taking the counterclockwise walk $W'$ defined as follows

$$
W': v_{k - 1}e_{k - 1} v_{k - 2} \cdots v_0e_nv_{n - 1} \cdots e_{k + 1} v_{k}, \text{ where } v_n = v_0
$$

See the following figure for an example

![Circuit Connectedness Example](./assets/circuit_connectedness_example.png)

If $W$ contains $v_ke_kv_{k - 1}$, connect $v_k$ to $v_{k - 1}$ by takin the clockwise walk $W''$ defined as follows:

$$
W'': v_ke_{k + 1}v_{k + 1} \cdots v_ne_1v_1e_2 \cdots e_{k - 1}v_{k - 1}, \text{ where } v_n = v_0
$$

Now patch either $W'$ or $W''$ into $W$ to form a new walk from $u$ to $w$. For instance, to path $W'$ into $W$, start with the section of $W$ From $u$ to $v_{k - 1}$ then take $W'$ from $v_{k - 1}$ to $v_k$, and finally take the section of $W$ From $v_k$ to $w$. If this new walk still contains an ocurrence of $e$, just repeat the process describes previously untils all ocurrences are eliminted (This must happen eventually since the ocurrences of $e$ in $C$ are finite.). The result is a walk from $u$ to $w$ that does not contain $e$ and hence is a walk in $G'$.

> [!NOTE] **The Tree Test**
>
> For any positive integer $n$, if $G$ is a connected graph with $n$ vertices and $n - 1$ edges, then $G$ is a tree.

**Proof**. Let $n$ be a positive integer and suppose $G$ is a particular but artitrarily chosen graph that is connected and has $n$ vertices and $n - 1$ edges. Suppose $G$ is not circuit free. That is, suppose $G$ has a circuit $C$.

We know that an edge of $C$ can be removed from $G$ to obtain a graph $G'$ that is connected. If $G'$ has a circuit, then repeat this process. Continue repeating the process of removing edges from circuits untils eventually a graph $G''$ is obtained that is connected and circuit-free.

By definition $G''$ is a tree. Since no vertices were removed from $G$ To from $G''$, then $G''$ has $n$ vertices. Thus by the properties of a tree $G''$ has $n - 1$ edges. But the suppositiong that $G$ has a circuit implies that at least once edge of $G$ is removed to form $G''$. Hence $G''$ has no more than $(n - 1) - 1 = n - 2$ edges, which contradicts its having $n - 1$ edges. So the supposition is false and $G$ is circuit-free, and therefore $G$ is a tree.

> [!NOTE] **The Circuit Test**
>
> If $G$ is any graph with $n$ vertices and $m$ edges, where $m$ and $n$ are positive integers and $m \geq n$, then $G$ has a circuit.

**Proof** (by mathematical indcution). Suppose not. Suppose there is a graph $G$ with $n$ vertices and $m$ edges, where $m$ and $n$ are positive integers and $m \geq n$, and suppose $G$ does not have a circuit. Let $G_1, G_2, \cdots, G_k$ be the connected components of $G$, and let $n_1, n_2, \cdots, n_k$ be the number of vertices of $G_1, G_2, \cdots, G_k$ respectively. Because $G_1, G_2, \cdots, G_k$ are the connected components of $G$,

$$
\sum_{i = 1}^k n_i = n
$$

Since $G$ does not have a circuit, none of $G_1, G_2, \cdots, G_k$ have circuits either. So, since each is connected, each is a tree, therefore the number of edges of each $G_i$ is $n_i - 1$. Now because $G$ is compose of its connected components,

$$
\text{ the number of edges of } G = \sum_{i = 1}^k \text{ the number of edges of } G_i \\[10pt]
= (n_1 - 1) + (n_2 - 1) + \cdots + (n_k - 1) \\[10pt]
= (n_1 + n_2 + \cdots + n_k) - (1 + 1 + \cdots + 1) \\[10pt]
= n - k < n
$$

Thus the number of edges of $G$ is less than $n$, which contradicts the hypothesis that the number of edges of $G$, namely $m$, is greater than or equal to $n$. Hence the supposition is false and $G$ has a circuit.
