window["_env_"] = {
    // To define project level configuration  possible values development, test, production
    NODE_ENV: "development",
    // Environment Variables for forms-flow-web
  
    //Keycloak-client-name for web
    REACT_APP_KEYCLOAK_WEB_CLIENTID:'case-flow-web',
    // Keycloak-client-name for web
    REACT_APP_KEYCLOAK_URL_REALM:'forms-flow-ai',

    // Keycloak base URL
    REACT_APP_KEYCLOAK_URL:'https://forms-flow-idm-caseflow.aot-technologies.com',


    // caseflow web Api End point
    REACT_APP_CASEFLOW_API_URL:'https://caseflow-core.aot-technologies.com',

    // caseflow  Api  GraphQL End point
    REACT_APP_CASEFLOW_GRAPHQL_API_URL:'https://caseflow-gateway.aot-technologies.com',


    // default DMS
    REACT_APP_CASEFLOW_DMS:3,

    // application name
    APPLICATION_NAME:'caseflow.ai',

    // LOB Graphql Base Url
    REACT_APP_CASEFLOW_LOB_GRAPHQL_API_URL:'https://caseflow-lob.aot-technologies.com',
    //  Take Number For Pagination 
    REACT_APP_PAGINATION_TAKE:10,


    //  Formsflow BPM base url
    REACT_APP_FORMSFLOW_URL:'https://forms-flow-bpm-caseflow.aot-technologies.com',


    //  Formsflow Application base url
    REACT_APP_FORMSFLOW_APP_URL:'https://forms-flow-forms-caseflow.aot-technologies.com',

    // DMS FILE UPLOAD DIRECT REST URL
    REACT_APP_CASEFLOW_DMS_API_URL:'https://caseflow-dms.aot-technologies.com',

    REACT_APP_FORMSFLOW_FORM_URL:'https://forms-flow-api-caseflow.aot-technologies.com',

    REACT_APP_FORMSFLOW_WEB_URL:'https://forms-flow-web-caseflow.aot-technologies.com',

    REACT_APP_GENERIC_NAME : Case
  };