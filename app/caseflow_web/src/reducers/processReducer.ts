import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    processDiagramXML: "",
    processActivityList: "",
    isProcessDiagramLoading: false,
    processActivityLoadError: false,
};

const processSlice = createSlice({
  name: "Process",
  initialState,
  reducers: {
    setProcessActivityData: (state, action) => {
      state.processActivityList = action.payload;
    },
    setProcessDiagramXML: (state, action) => {
      state.processDiagramXML = action.payload;
    },
    setProcessDiagramLoading: (state, action) => {
      state.isProcessDiagramLoading = action.payload;
    },
    setProcessActivityLoadError: (state, action) => {
      state.processActivityLoadError = action.payload;
    },
  },
});

export const {
    setProcessActivityData,
    setProcessDiagramXML,
    setProcessDiagramLoading,
    setProcessActivityLoadError,
} = processSlice.actions;
export default processSlice.reducer;
