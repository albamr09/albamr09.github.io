---
title: Quadratic Equations and Inequalities
weight: 5
type: docs
math: true
---

## Complex Numbers

The number \(i\) is not a real number and is often called the **imaginary unit**, but the number \(i^2\) is the real number \(-1\).

> [!TIP] **Definition 6.1**
>
> A **complex number** is any number that can be expressed in the form
>
> $$ a + bi$$
> where \(a\) and \(b\) are real numbers.

The form \(a + bi\) is called the **standard form** of a complex number. The real number \(a\) is called the **real part** of the complex number, and \(b\) is called the **imaginary part**.

Two complex numbers \(a + bi\) and \(c + di\) are said to be **equal** if and only if \(a = c\) and \(b = d\).

### Adding and Subtracting Complex Numbers

To add complex numbers, we simply add their real parts and add their imaginary parts.

$$
(a + bi) + (c + di) = (a + c) + (b + d)i
$$

The set of complex numbers is **closed with respect to addition**; that is, the sum of two complex numbers is a complex number. Furthermore, the **commutative and associative properties of addition hold** for all complex numbers.

### Simplifying Radicals Involving Negative Numbers

In the set of complex numbers every negative real number has two square roots because:

$$
(i \sqrt{b})(i \sqrt{b}) = i^2b = -1b
$$

so we see that:

$$
\sqrt{-b} = i\sqrt{b}
$$

### Multiplying Complex Numbers

"e say that two complex numbers \(a + bi\) and \(a - bi\) are called **conjugates** of each other. The product of a complex number and its conjugate is always a real number.

$$
(a + bi)(a - bi) = a(a - bi) + bi(a - bi) \\
= a^2 - abi + abi - b^2i^2 \\
= a^2 - b^2(-1) \\
= a^2 + b^2
$$

### Dividing Complex Numbers

We use conjugates to simplify expressions such as \(\frac{3i}{5 + 2i}\) that indicate the quotient of two complex numbers.

## Quadratic Equations

A **quadratic equation** in the variable x can also be defined as any equation that can be written in the form:

$$
ax^2 + bx + c = 0
$$

where \(a\), \(b\) and \(c\) are real numbers and \(a \neq 0\). The previous expression is referred as the **standard form**.

### Solving Quadratic Equations of the Form \(x^2 = a\)

$$
x^2 = a \\
x^2 - a = 0 \\
x^2 - (\sqrt{a})^2 = 0 \
(x - \sqrt{a})(x + \sqrt{a}) = 0
$$

Therefore

$$
x - \sqrt{a} = 0 \\
x = \sqrt{a}
$$

or

$$
x + \sqrt{a} = 0
x = -\sqrt{a}
$$

> [!NOTE] **Property 6.1**
>
> For any real number \(a\)
>
> \(x^2 = a\) if and only if \(x = \sqrt{a}\) or \(x = -\sqrt{a}\)
>
> The statement can be rewritten as \(x = \pm \sqrt{a}\)

## Completing the Square

In this section we examine another method called **completing the square**, which will give us the power to solve any quadratic equation.

For example to solve \(x^2 + 10x - 2 = 0\):

$$
x^2 + 10x - 2 = 0 \\
x^2 + 10x = 2 \\
x^2 + 2(\frac{10}{2})x = 2 \\
x^2 + 2(5)x = 2 \\
x^2 + 10x + 5^2 = 2 + 5^2 \\
(x + 5)^2 = 27 \\
x + 5 = \pm \sqrt{27} \\
x + 5 = 3 \pm \sqrt{3} \\
x = -5 + 3 \pm \sqrt{3} \\
$$

## Quadratic Formula

> [!TIP] **Definition Quadratic Formula**
>
> $$ x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}, a \neq 0 $$

### Determining the Nature of Roots of Quadratic Equations

The quadratic formula makes it easy to determine the nature of the roots of a quadratic equation without completely solving the equation. The number

$$
b^2 - 4ac
$$

which appears under the radical sign in the quadratic formula, is called the **discriminant** of the quadratic equation. The discriminant is the indicator of the kind of roots the equation has.

1. If \(b^2 - 4ac < 0\), then the equation has two nonreal complex solutions.
2. If \(b^2 - 4ac = 0\), then the equation has one real solution.
3. If \(b^2 - 4ac > 0\), then the equation has two real solutions.

We make the statement that if \(b^2 - 4ac = 0 \), then the equation has one real solution. Technically, such an equation has two solutions, but they are equal. We sometimes refer to this as one real solution with a multiplicity of two.

We refer to each of the solutions as **critical numbers**.
