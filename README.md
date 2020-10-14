# It's Naptime, yay!
This is Lee's living portfolio and exploratory playground.

## Naming Conventions 
I'm *loosely* following [BEM Methodology](https://webdesign.tutsplus.com/articles/an-introduction-to-the-bem-methodology--cms-19403).

- `-` is just a word separator
- `__` is an element indicator
- `--` is a modifier/state indicator 
- `_` has not yet been leveraged 

**Folder/Filename Prefixes**
- `b-` Basic Styles
- `c-` Common Styles
- `h-` Helper Styles
- `js-` Javascript *(redundant, but reinforces the convention)*
- `m-` Media Query Style Overrides
- `t-` Theme Style Overrides
- `v-` Design Exploration Version

**Javascript Conventions**
- In Javascript files I prefix everything with `js_[x]_` where `[x]` is the first one or two letters of the filename. I do this so that if I reference a variable or function in a different file I know who is responsible for it.
- In HMTL files I prefix things that are modified by Javascript with a `js_`. 

**Other Notes**
- I'm using [Design Tokenizer](https://www.figma.com/community/plugin/767048666042724266/Design-Tokenizer) (a plugin I created for [Figma](http://figma.com/)) to *almost* directly integrate Figma content into my code base.