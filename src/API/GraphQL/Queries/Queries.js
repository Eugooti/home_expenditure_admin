import { gql } from "@apollo/client";

// Expenditure specific Queries
export const GET_EXPENDITURES = gql`
  query GetAllExpenditures {
    getAllExpenditures {
      id
      name
      category
      cost
      description
      createdBy
    }
  }
`;

export const GET_EXPENDITURE_BY_ID = gql`
  query GetExpenditureById($expenditureId: Int!) {
    getExpenditureById(id: $expenditureId) {
      id
      name
      category
      cost
      description
      createdBy
    }
  }
`;

export const GET_EXPENDITURES_BY_USER = gql`
  query GetExpendituresByUser($emailAddress: String!) {
    getExpenditureByUser(emailAddress: $emailAddress) {
      id
      name
      category
      cost
      description
      createdBy
    }
  }
`;

// Category specific Queries
export const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    getAllCategories {
      id
      name
      description
    }
  }
`;

export const GET_CATEGORY_BY_ID = gql`
  query GetCategoryById($categoryId: Int!) {
    getCategoryById(id: $categoryId) {
      id
      name
      description
    }
  }
`;

export const GET_CATEGORIES_BY_USER = gql`
  query GetCategoriesByUser($emailAddress: String!) {
    getCategoriesByUser(emailAddress: $emailAddress) {
      id
      name
      description
      maximumCash
      createdBy
    }
  }
`;

// ToDo specific Queries
export const GET_ALL_TODOS = gql`
  query GetAllToDos {
    getAllToDo {
      id
      title
      description
      createdBy
      # Add more fields as needed
    }
  }
`;

export const GET_TODO_BY_ID = gql`
  query GetToDoById($id: Int!) {
    getToDoByID(id: $id) {
      id
      title
      description
      createdBy
      # Add more fields as needed
    }
  }
`;

export const GET_TODOS_BY_USER = gql`
  query GetToDosByUser($emailAddress: String!) {
    getByUser(emailAddress: $emailAddress) {
      id
      title
      description
      createdBy
    }
  }
`;


//Events Specific queries

export const GET_ALL_EVENTS=gql`
    query GetAllEvents{
        getAllEvents{
            id
            title
            description
            start
            end
            CreatedBy
        }
    } 
`;

export const GET_EVENTS_BY_ID=gql`
  query GetEventById($id: Int!) {
      getEventById(id: $id) {
          id
          title
          description
          start
          end
          CreatedBy
      }
  }
`;

export const GET_EVENTS_BY_USER = gql`
  query GetEventsByUser($emailAddress: String!) {
    getEventsByUser(emailAddress: $emailAddress) {
          id
          title
          description
          start
          end
          CreatedBy
    }
  }
`;