# Naptime, yay!
Lee's portfolio and exploratory playground.

## Naming Conventions 
I'm loosely following the [BEM Methodology](https://webdesign.tutsplus.com/articles/an-introduction-to-the-bem-methodology--cms-19403).

- `-` is just a word separator
- `__` is an element indicator
- `--` is a modifier/state indicator 

**Filename Prefixes**
- `c-` Component
- `h-` Helper
- `l-` Layout
- `s-` Style 
- `js-` Javascript **(redundant, but reinforces the convention)**

**Other**
- In Javascript files I prefix everything with `js_[x]_` where `[x]` is the first one or two letters of the filename. I do this so that if I reference a variable or function in a different file I know who is responsible for it.
- In HMTL files I prefix elements that are modified by Javascript with a `js_`. 