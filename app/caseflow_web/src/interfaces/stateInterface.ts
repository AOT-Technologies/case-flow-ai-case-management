import { RouterState } from "redux-first-history";
export interface State {
  auth: Auth;
  app: Application;
  documents: Document;
  cases: Cases;
  constants: Constants;
  lob: Lob;
  tasks: Tasks;
  contacts: Contacts;
  individuals: Individuals;
  bpmTasks: BPMTasks;
  process:Process;
}

export type AuthState = {
  token: string;
  roles: string;
  userDetails: USerDetails;
  isAuthenticated: boolean;
};
export interface Auth {
  token: string;
  roles: string;
  userDetails: USerDetails;
  isAuthenticated: boolean;
}

export interface Application {
  isShowLoader: boolean;
  progressBarStatus: number;
  advanceSearchResult: {
    searchResult: any[];
    totalCount: string | number;
  };
}

export interface Document {
  documentsList: never[];
  seletedDocument: null;
  totalPageCount: 1;
  documentsSearchResult: {};
}

export interface SelectedCase {
  id: number;
  statusid: number;
  lobDetails: any;
  documents: any[];
  totalDocCount: number;
  typeid: number;
  lobcaseid: number;
  tasks: any[];
  additionalFields: any;
  notes: any[];
  email: string;
  individualid: string;
  contactid: string;
  phonenumber: string;
  dateofbirth: Date;
  city: string;
  region: string;
  issuetype: String;
  describetheissue: string;
  caseowner: string;
  resolutionsought: string;
  casestatus: CaseStatuses;
}

export interface SelectedContacts {
  id: number;
  firstname: string;
  lastname: string;
  phonenumber: number;
  email: string;
  dateofbirth: Date;
  address: string;
  createdat: Date;
}

export interface SelectedIndividuals {
  id: number;
  firstname: string;
  lastname: string;
  phonenumber: number;
  email: string;
  dateofbirth: Date;
  address: string;
  createdat: Date;
}

export interface CaseList {
  id: number;
  email: string;
  individualid: string;
  contactid: string;
  phonenumber: string;
  dateofbirth: Date;
  city: string;
  region: string;
  issuetype: String;
  caseowner: string;
  resolutionsought: string;
  describetheissue: string;
  status: string;
}
[];

export interface ContactList {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
}
[];

export interface IndividualList {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
}
[];

export interface Cases {
  selectedCase: SelectedCase;
  caseList: CaseList[];
  totalCaseCount: number;
  pageSelected: number;
  searchCaseResult: {};
  selectedCaseFormType: undefined;
}

export interface Contacts {
  selectedContact: SelectedContacts;
  contactList: ContactList[];
  totalContactCount: number;
  pageSelected: number;
  searchContactResult: {};
}

export interface Individuals {
  selectedIndividual: SelectedIndividuals;
  IndividualList: IndividualList[];
  totalIndividualCount: number;
  pageSelected: number;
  searchIndividualResult: {};
}

export interface USerDetails {
  email: string;
  userName: string;
}

export interface store {
  router: RouterState;
  auth: AuthState;
  documents: Document;
  app: Application;
  cases: Cases;
}

export interface Constants {
  caseStatuses: CaseStatuses[];
  caseTypes: CaseTypes[];
}

export interface CaseStatuses {
  id: number;
  casetypeid: number;
  name: string;
  displayname: string;
  code: string;
  lobcaseid: number;
  formid: string;
}

export interface CaseTypes {
  id: number;
  name: string;
  displayname: string;
  code: number;
  formid: string;
  searchterm:string
}
export interface Lob {
  lobList: LobList[];
  totalLobCount: number;
  pageSelected: number;
  selectedLob: LobList;
  editLob: boolean;
  searchLobResult: {};
}
export interface LobList {
  id: number;
  sumAssured: number;
  policyNumber: string;
  createdat: Date;
  isActive: string;
  policyExpiryDate: Date;
  policyEffectiveDate: Date;
}
export interface Tasks {
  userTasksList: any[];
  totalTaskCount: number;
  pageSelected: number;
}
export interface Process {
  processDiagramXML: any;
  processActivityList: any;
  isProcessDiagramLoading: boolean;
  processActivityLoadError: boolean;
}
export interface BPMTasks {
  taskGroups: [
    {
      userId: null,
      groupId: "formsflow/formsflow-reviewer",
      type: "candidate",
    },
  ],
  filterSearchSelections: [],
  processList: [
    {
      id: "sample_id_1",
      key: "Atm",
      description: null,
      name: null,
      version: 1,
      resource: "atm-workflow.bpmn",
      deploymentId: "deployment_id_1",
      diagram: null,
      suspended: false,
      tenantId: null,
      versionTag: null,
      historyTimeToLive: null,
      startableInTasklist: true,
    },
    {
      id: "sample_id_2",
      key: "atm-process",
      description: null,
      name: "ATM Process",
      version: 1,
      resource: "atm-workflow.bpmn",
      deploymentId: "deployment_id_2",
      diagram: null,
      suspended: false,
      tenantId: null,
      versionTag: "1",
      historyTimeToLive: null,
      startableInTasklist: true,
    },
  ],
  tasksList: [
    {
      _embedded: null,
      id: "4bed2c7b-5c01-11ec-b3b9-0242ac190008",
      name: "Review Submission",
      assignee: "assignee_name_1",
      created: "2021-12-13T10:41:58.020+0000",
      due: null,
      followUp: null,
      delegationState: null,
      description: null,
      executionId: "4b8a9a12-5c01-11ec-b3b9-0242ac190008",
      owner: null,
      parentTaskId: null,
      priority: 50,
      processDefinitionId: "processDefinitionId_1",
      processInstanceId: "processInstanceId_1",
      taskDefinitionKey: "reviewer",
      caseExecutionId: null,
      caseInstanceId: null,
      caseDefinitionId: null,
      suspended: false,
      formKey: null,
      tenantId: null,
    },
    {
      _embedded: null,
      id: "c555c8b2-5be3-11ec-b3b9-0242ac190008",
      name: "Review Submission",
      assignee: null,
      created: "2021-12-13T07:10:36.808+0000",
      due: null,
      followUp: null,
      delegationState: null,
      description: null,
      executionId: "c4ef1799-5be3-11ec-b3b9-0242ac190008",
      owner: null,
      parentTaskId: null,
      priority: 50,
      processDefinitionId: "processDefinitionId_2",
      processInstanceId: "processInstanceId_2",
      taskDefinitionKey: "reviewer",
      caseExecutionId: null,
      caseInstanceId: null,
      caseDefinitionId: null,
      suspended: false,
      formKey: null,
      tenantId: null,
    },
  ],
  filterListSearchParams: {},
  filterListSortParams: {
    sorting: [{ sortBy: "created", sortOrder: "desc", label: "Created" }],
  },
  listReqParams: {
    sorting: [{ sortBy: "created", sortOrder: "desc", label: "Created" }],
  },
  taskId: "569a3712-5bdd-11ec-81d3-0242ac190008",
  filterList: [
    {
      id: "1d_1",
      resourceType: "Task",
      name: "All tasks",
      owner: null,
      query: {
        taskVariables: [],
        processVariables: [],
        caseInstanceVariables: [],
        orQueries: [],
      },
      properties: {},
    },
    {
      id: "id_2",
      resourceType: "Task",
      name: "Clerk Task",
      owner: null,
      query: {
        candidateGroup: "formsflow/formsflow-reviewer/clerk",
        includeAssignedTasks: true,
        taskVariables: [],
        processVariables: [],
        caseInstanceVariables: [],
        orQueries: [],
      },
      properties: {
        color: "#555555",
        showUndefinedVariable: false,
        refresh: false,
        priority: 0,
      },
    },
  ],
  isFilterLoading: false,
  selectedFilter: {
    id: "random_id",
    resourceType: "Task",
    name: "All tasks",
    owner: null,
    query: {
      taskVariables: [],
      processVariables: [],
      caseInstanceVariables: [],
      orQueries: [],
    },
    properties: {},
  },
}