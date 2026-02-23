1. getElementById can get only one element because Id is always unique but querySelector can select by id, class, or tag Name. getElementsByClassName and querySelectorAll can return multiple elements because multiple classes can be selected. getElementsByClassName returns an HTMLCollection but querySelectorAll returns a NodeList.

2. To create and insert a new element into the DOM, firstly i need to create an element with createElement method then i add content with innerText or innerHTML and then append it to the exiting element.

3. Event Bubbling happens when a child element is clicked, the event propagate up to its parent element. we know that a web page is build with elements, those elements are nested each other. if i clicked a button it first fires on the button then bubble up its parent div and its continue until it reached the top

4. In JavaScript Event Delegation is a technique where I can add an event listener to a common parent for multiple child elements. it is useful because its reduce code and i don't need to add new event Listener for new child.

5. The difference between preventDefault() but stopPropagation() is preventDefault() can stop default behavior of an element and stopPropagation() can stop Event Bubbling.