---
title: Differential Equations
weight: 3
type: docs
math: true
---

## Derivatives of Polynomials and Exponential Functions

### Constant Functions

The derivative of the constant function \(f(x) = c\) is defined as:

$$
f'(x) = \lim_{h \rightarrow 0} \frac{f(x + h) - f(x)}{h} = \lim_{h \rightarrow 0} \frac{c - c}{h} = \lim_{h \rightarrow 0} 0 = 0
$$

> [!NOTE] **Derivative of a Constant Function**
>
> $$ \frac{d}{dx} (c) = 0 $$

### Power Functions

Let \(f(x) = x^n\), where \(n\) is a positive integer. If \(n = 1\), the graph of \(f(x) = x\) is the line \(y = x\), which has slope \(1\)

> [!NOTE] **Derivative of a Linear Function**
>
> $$ \frac{d}{dx} (x) = 1 $$

For \(n = 4\), we find the derivative of \(f(x) = x^4\) as follows:

$$
f'(x) = \lim_{h \rightarrow 0} \frac{f(x + h) - f(x)}{h} = \lim_{h \rightarrow 0} \frac{(x + h)^4 - x^4}{h}
$$

$$
= \lim_{h \rightarrow 0} \frac{x^4 + 4x^3h +6x^2h^2 + 4xh^3 + h^4 - x^4}{h}
$$

$$
= \lim_{h \rightarrow 0} \frac{4x^3h +6x^2h^2 + 4xh^3 + h^4}{h}
$$

$$
= \lim_{h \rightarrow 0} 4x^3 +6x^2h + 4xh^2 + h^3 = 4x^3
$$

We see a pattern emerging.

> [!TIP] **The Power Rule**
>
> $$ \frac{d}{dx} (x^n) = nx^{n-1} $$

**First Proof** We know that:

$$
x^n - a^n = (x - a)(x^{n - 1} + x^{n - 2}a + \cdots + xa^{n - 2} + a^{n - 1})
$$

If \(f(x) = x^n\), then:

$$
f'(a) = \lim_{x \rightarrow a} \frac{f(x) - f(a)}{x - a} = \lim_{x \rightarrow a} \frac{x^n - a^n}{x - a}
$$

$$
= \lim_{x \rightarrow a} \frac{(x - a)(x^{n - 1} + x^{n - 2}a + \cdots + xa^{n - 2} + a^{n - 1})}{x - a}
$$

$$
= \lim_{x \rightarrow a} (x^{n - 1} + x^{n - 2}a + \cdots + xa^{n - 2} + a^{n - 1})
$$

$$
= a^{n - 1} + a^{n - 2}a + \cdots + a a^{n - 2} + a^{n - 1}
$$

$$
= na^{n - 1}
$$

**Second Proof**

$$
f'(x) = \lim_{h \rightarrow 0} \frac{f(x + h) - f(x)}{h} = \lim_{h \rightarrow 0} \frac{(x + h)^n - x^n}{h}
$$

We expand \((x + h)^n\) using the [Binomial Theorem](../../agaa/11_further_topics/#the-binomial-theorem):

$$
f'(x) = \lim_{h \rightarrow 0} \frac{\left[x^n + nx^{n - 1}h + \frac{n(n - 1)}{2}x^{n - 2}h^2 + \cdots + nxh^{n - 1} + h^n \right] - x^n}{h}
$$

$$
= \lim_{h \rightarrow 0} \frac{nx^{n - 1}h + \frac{n(n - 1)}{2}x^{n - 2}h^2 + \cdots + nxh^{n - 1} + h^n}{h}
$$

$$
= \lim_{h \rightarrow 0} nx^{n - 1} + \frac{n(n - 1)}{2}x^{n - 2}h^ + \cdots + nxh^{n - 2} + h^{n - 1} = nx^{n - 1}
$$

because every term except the first has \(h\) as a factor and therefore approaches \(0\).

But, what about power functions with negative integer exponents? See for example the derivative for \(\frac{1}{x}\):

$$
\frac{d}{dx} \frac{1}{x} = -\frac{1}{x^2}
$$

We can rewrite these functions as follows:

$$
\frac{d}{dx} (x^{-1}) = (- 1) x^{-2}
$$

and so the [Power Rule](#power-functions) is true when \(n = -1\).

What if the exponent is a fraction:

$$
\frac{d}{dx} \sqrt{x} = \frac{1}{2\sqrt{x}}
$$

which can be rewritten as

$$
\frac{d}{dx} (x^{\frac{1}{2}}) = \frac{1}{2}x^{-\frac{1}{2}}
$$

> [!TIP] **The Power Rule (General Version)**
>
> If \(n\) is any real nmber, then
>
> $$ \frac{d}{dx} x^n = nx^{n - 1} $$

In general, a function increases when its derivative is positive and decreases when it derivative is negative.

The Power Rule enables us to find _normal lines_. The **normal line** to a curve \(C\) at a point \(P\) is the line through \(P\) that is perpendicular to the tangent line at \(P\).

### New Derivatives from Old

> [!TIP] **The Constant Multiple Rule**
>
> If \(c\) is a constant and \(f\) is a differentiable function, then
>
> $$ \frac{d}{dx} [c(fx)] = c \frac{d}{dx} f(x) $$

**PROOF** Let \(g(x) = cf(x)\). Then

$$
g'(x) = \lim_{h \rightarrow 0} \frac{g(x + h) - g(x)}{h} = \lim_{h \rightarrow 0} \frac{cf(x + h) - cf(x)}{h}
$$

$$
= \lim_{h \rightarrow 0} c\left[\frac{f(x + h) - f(x)}{h}\right]
$$

By the [Limit Laws](../02_limits/#properties-of-limits):

$$
= c \lim_{h \rightarrow 0}\left[\frac{f(x + h) - f(x)}{h}\right] = cf'(x)
$$

> [!TIP] **Sum and Difference Rules**
>
> If \(f\) and \(g\) are both differentiable, then
>
> $$ \frac{d}{dx} [f(x) + g(x)] = \frac{d}{dx} f(x) + \frac{d}{dx} g(x) $$
>
> $$ \frac{d}{dx} [f(x) - g(x)] = \frac{d}{dx} f(x) - \frac{d}{dx} g(x) $$

**Proof** To prove the **Sum Rule**, we let \(F(x) = f(x) + g(x)\). Then:

$$
F'(x) = \lim_{h \rightarrow 0} \frac{F(x + h) - F(x)}{h}
$$

$$
= \lim_{h \rightarrow 0} \frac{[f(x + h) + g(x + h)] - [f(x) + g(x)]}{h}
$$

$$
= \lim_{h \rightarrow 0} \left[\frac{f(x + h) - f(x)}{h} + \frac{g(x + h) - g(x)]}{h} \right]
$$

By the [Limit Laws](../02_limits/#properties-of-limits):

$$
= \left[\lim_{h \rightarrow 0} \frac{f(x + h) - f(x)}{h}\right] + \left[\lim_{h \rightarrow 0}\frac{g(x + h) - g(x)]}{h} \right]
$$

$$
= f'(x) + g'(x)
$$

To prove the Difference Rule, we write \(f - g\) as \(f + (-1)g\) and apply the Sum Rule and the Constant Multiple Rule.

The Sum Rule can be extended to the sum of any number of functions. For instance, using this theorem twice, we get

$$
(f + g + h)' = [(f + g) + h]' = (f + g)' + h' = f' + g' + h'
$$

The Constant Multiple Rule, the Sum Rule, and the Difference Rule can be combined with the Power Rule to differentiate any polynomial.

Let \(p(x) = a*n x^n + a*{n - 1}x^{n-1} + \cdots + a_1 x + a_0\), then:

$$
p'(x) = \frac{d}{dx}(a_n x^n + a_{n - 1}x^{n-1} + \cdots + a_1 x + a_0)
$$

By the Sum Rule and the Constant Multiple Rule:

$$
= \sum_{i=0}^n \frac{d}{dx} a_i x^i = \sum_{i=0}^n a_i \frac{d}{dx} x^i
$$

By the definition for the derivative of a power function:

$$
= \sum_{i=0}^n (a_i)(i)x^{i-1}
$$

**Example**

$$
\frac{d}{dx} (x^8 + 12x^5 - 4x^4 + 10x^3 - 6x + 5)
$$

$$
= \frac{d}{dx} (x^8) + \frac{d}{dx} (12x^5) + \frac{d}{dx} (-4x^4) + \frac{d}{dx} (10x^3) + \frac{d}{dx} (-6x) + \frac{d}{dx} (5)
$$

$$
= 8x^7 + (12)(5)x^4 + (-4)(4)x^3 + (10)(3)x^2 + -6 + 0
$$

### Exponential Functions

Let’s try to compute the derivative of the exponential function \(f(x) = b^x\) using the definition of a derivative:

$$
f'(x) = \lim_{h \rightarrow 0} \frac{f(x + h) - f(x)}{h} = \lim_{h \rightarrow 0} \frac{b^{x + h} - b^x}{h}
$$

$$
= \lim_{h \rightarrow 0} \frac{b^xb^h - b^x}{h} = \lim_{h \rightarrow 0} \frac{b^x(b^h - 1)}{1}
$$

The factor \(b^x\) does not depend on \(h\), so we can take it in front of the limit:

$$
= b^x \lim_{h \rightarrow 0} \frac{b^h - 1}{h}
$$

Notice that the limit is thevalue of the derivative of \(f\) at \(0\):

$$
\lim_{h \rightarrow 0} \frac{b^h - 1}{h} = f'(0)
$$

Therefore we have shown that if the exponential function \(f(x) = b^x\) is differentiable at \(0\), then it is differentiable everywhere and:

$$
f'(x) = f'(0)b^x
$$

This equation says that _the rate of change of any exponential function is proportional to the function itself_.

> [!TIP] **Number \(e\)**
>
> \(e\) is the number such that:
>
> $$ \lim{h \to 0} \frac{e^h - 1}{h} = 1 $$

> [!TIP] **Derivative of the Natural Exponential Function**
>
> $$ \frac{d}{dx} (e^x) = e^x $$

Thus the exponential function \(f(x) = e^x\) has the property that it is its own derivative.
The geometrical significance of this fact is that the slope of a tangent line to the curve \(y = e^x\) at a point \((x, e^x)\) is equal to the \(y\)-coordinate of the point.
