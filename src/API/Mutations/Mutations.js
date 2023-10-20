import { gql } from "@apollo/client";

// Mutation to create a new expenditure
export const CREATE_EXPENDITURE = gql`
  mutation CreateExpenditure(
    $name: String!
    $category: String!
    $cost: Int!
    $description: String!
    $createdBy: String!
  ) {
    createExpenditure(
      name: $name
      category: $category
      cost: $cost
      description: $description
      createdBy: $createdBy
    ) {
      id
      name
      category
      cost
      description
      createdBy
    }
  }
`;

// Mutation to update an expenditure
export const UPDATE_EXPENDITURE = gql`
  mutation UpdateExpenditure(
    $id: Int!
    $name: String
    $category: String
    $cost: Int
    $description: String
    $updatedBy: String
  ) {
    updateExpenditure(
      id: $id
      name: $name
      category: $category
      cost: $cost
      description: $description
      updatedBy: $updatedBy
    ) {
      id
      name
      category
      cost
      description
      createdBy
      updatedBy
    }
  }
`;

// Mutation to delete an expenditure
export const DELETE_EXPENDITURE = gql`
  mutation DeleteExpenditure($id: Int!) {
  deleteExpenditure(id: $id)
}

`;




export const CREATE_CATEGORY = gql`
  mutation CreateCategory($name: String!, $description: String!, $maximumCash: Int!, $createdBy: String!) {
    createCategory(name: $name, description: $description, maximumCash: $maximumCash, createdBy: $createdBy) {
      id
      name
      description
      maximumCash
      createdBy
    }
  }
`;


// Mutation to update a category
export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory(
    $id: Int!
    $name: String!
    $description: String!
    $maximumCash: Int!
  ) {
    updateCategory(
      id: $id
      name: $name
      description: $description
      maximumCash: $maximumCash
    ) {
      id
      name
      description
      maximumCash
      createdBy
    }
  }
`;

// Mutation to delete a category
export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: Int!) {
    deleteCategory(id: $id)
  }
`;

// Mutation to create a new ToDo item
export const CREATE_TODO = gql`
  mutation CreateToDo(
    $title: String!
    $date: String!
    $description: String!
    $createdBy: String!
  ) {
    createToDo(
      title: $title
      date: $date
      description: $description
      createdBy: $createdBy
    ) {
      id
      title
      date
      description
      createdBy
    }
  }
`;

// Mutation to update a ToDo item
export const UPDATE_TODO = gql`
  mutation UpdateToDo(
    $id: Int!
    $title: String
    $date: String
    $description: String
  ) {
    updateToDo(
      id: $id
      title: $title
      date: $date
      description: $description
    ) {
      id
      title
      date
      description
      createdBy
    }
  }
`;

// Mutation to delete a ToDo item
export const DELETE_TODO = gql`
  mutation DeleteToDoItem($id: Int!) {
    deleteTodoItem(id: $id)
  }
`;


//Events specific mutations

export const CREATE_EVENT=gql`
    mutation createEvent(
        $title:String!
        $description:String!
        $start:String!
        $end:String!
        $CreatedBy:String!
    ){
        createEvent(
            title:$title
            description:$description
            start:$start
            end:$end
            CreatedBy:$CreatedBy
        )
    }
`;

export const UPDATE_EVENT=gql`
    mutation updateEvent(
        $title:String!
        $description:String!
        $start:String!
        $end:String!
        $CreatedBy:String!
    ){
        createEvent(
            title:$title
            description:$description
            start:$start
            end:$end
            CreatedBy:$CreatedBy
        )
    }
`;

export const DELETE_EVENT=gql`
    mutation DeleteEvent($id: Int!){
        deleteEvent(id: $id)
    }
`;
