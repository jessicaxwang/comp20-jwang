# Jessica Wang (Lab 9)

Everything has been correctly implemented.

I have neither collaborated with nor discussed this assignment with anyone.

Approximately 1 hour spent completing the assignment.

Answer to important question:
It is not possible to request data from a different origin using XMLHTTPRequest. 
The reason for this is security: when the World Wide Web was just being formed, it was found possible to exchange information from one website with another. "Cross-site scripting" is a security breach that enables another party to 
inject client-side scripts (these change interface behaviors) into webpages viewed by other users, and is something that 
can occur with successful cross-domain requests. Because of this, the same-origin policy was created, and therefore it isn't possible to request data from other domains such as Heroku. 

Furthermore, why it is not posisble to request data from another domain has to do with the definition of "origin" in the "same-origin policy". According to the Mozilla web docs article, "Two pages have the same origin if the protocol, port (if one is specified), and host are the same for both pages". 

As for origin definitions in files, a file can read another file only if the parent directory of the originating file is an ancestor directory of the target file. Most of the time, an XMLHTTPRequest will not succeed on a file on your local computer
because that is a serious breach of security - however, because files don't have a clearly defined host name or port associated with their URLs, sometimes this can lead to corner cases, which can be exceedingly dangerous; some earlier verions of certain browsers did allow cross-origin requests, so results may vary.