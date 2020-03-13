I decide itemsPerPage

Need to access the fetched students at launch to calculate numberOfPages and currentPage in state of StudentsGallery

firstItemIndex

Then use numberOfPages in Pagination

Search input is a form so it could be connected to the store using Redux Form or I should use an action and pass the controlled input from the local state. To avoid rerendering of all the components everytime I press a key I could use shouldComponentUpdate or lodash or just add a search button and dispatch the search action only onSubmit.

I get the actions by importing them from the actions file then mapDispatch ToProps or add them as destructured argument in the currying with mapStateToProps

In the code I access them using the props.

Now I have transfered the pagination and the search results to the reducer

At launch the data source is Students because filterlist is empty
When I enter a letter in the input the data source becomes filterlist
When I remove the input the data source goes back Students it reflects on the list in the studentGallery component
But the currentpage and the total of page in the Pagination component are not updated why??

The onChange receives the filteredList but does not sent the updates to the store
