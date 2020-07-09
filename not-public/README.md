'Simulates' Apaches `mod_include` for Vercel.
===============================

* `<!--#include file="test.txt" -->`

* `<!--#include virtual="/api/time.js" -->`

Why?
----

I run a static [site](https://paul.kinlan.me/), it's built with Hugo and hosted on the Edge with Vercel. Sometimes, I just
want to include a small piece of server-side logic (Copyright notice anyone?) without having to spin up a complex node server
or api endpoints. Sometimes I want to be able to drop a small piece of dynamic content in one single page on my static site.

That's what I loved about Apache `mod_include`. `mod_include` let's you drop a special formatted HTML comment in to your HTML template and Apache server would then 'include' the output of the command in your outputted HTML.

When I was a perl monger, I really only ever used 'file' (for template building) and 'virtual' for integrating some dynamic content. 

How does it work?
-----------------

It's not automatic, you have to have a the `ssi.js` file in your API directory and you have to have a rewrite setup that directs
all requests to the `ssi.js` function.

Note: File's in /public are automatically edge cached by Vercel and won't be able to be intercepted (it seems).

* The `file` command will pull a file from your uploaded output.
* The `virtual` command simply will http-fetch the `/api` that is in your project. `/api/` is the new `/cgi-bin/`... 

What to watch out for
---------------------

You will want to make sure caching is properly enabled because you really don't want to have to execute functions just for
every single page view. Ideally, you still want to get your 'static' pages to the edge.

