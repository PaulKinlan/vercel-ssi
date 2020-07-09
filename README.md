'Simulates' Apaches `mod_include` for Vercel.
===============================

* `<!--#include file="test.txt" -->`

* `<!--#include virtual="/api/time.js" -->`

Why?
----

I run a static [site](https://paul.kinlan.me/), it's built with Hugo and hosted on the Edge with Vercel. Sometimes, I just
want to include a small piece of server-side logic (Copyright notice anyone?) without having to spin up a complex node server
or api endpoints. Sometimes I want to be able to drop a small piece of dynamic content in one single page on my static site.

That's what I loved about Apache `mod_include`.

How does it work?
-----------------

It's not automatic, you have to have a the `ssi.js` file in your API directory and you have to have a rewrite setup that directs
all requests to the `ssi.js` function.

NOte: File's in /public are automatically edge cached by Vercel and won't be able to be intercepted (it seems).

What to watch out for
---------------------

You will want to make sure caching is properly enabled because you really don't want to have to execute functions just for
every single page view. Ideally, you still want to get your 'static' pages to the edge.

