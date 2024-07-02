import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../interfaces/stateInterface";

import BpmnJS from "bpmn-js/dist/bpmn-navigated-viewer.production.min.js";
import Loading from "../../../containers/Loading";
import "./bpm.scss";
import usePrevious from "./UsePrevious";
import { fetchDiagram, getProcessActivities } from "../../../services/workflowService";
import { setProcessActivityData, setProcessActivityLoadError, setProcessDiagramLoading, setProcessDiagramXML } from "../../../reducers/processReducer";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
const ProcessDiagram = 
  (props) => {
    const dispatch = useDispatch();
    const processKey = props?.processKey;
    const processInstanceId = props?.processInstanceId;
    const tenant = props?.tenant;
    const isProcessDiagramLoading = useSelector(
      (state: State) => state?.process?.isProcessDiagramLoading
    );
    const diagramXML = useSelector((state: State) => state?.process?.processDiagramXML);
    const markers = useSelector((state: State) => state?.process?.processActivityList);
    const prevMarkers = usePrevious(markers);
    const [bpmnViewer, setBpmnViewer] = useState(null);

    const containerRef = useCallback((node) => {
      if (node !== null) {
        setBpmnViewer(new BpmnJS({ container: "#process-diagram-container" }));
      }
    }, []);

    useEffect(() => {
      if (bpmnViewer) {
        bpmnViewer.on("import.done", (event) => {
          const { error } = event;
          if (error) {
            console.log("bpmnViewer error >", error);
          }
        });
      }
      return () => {
        bpmnViewer && bpmnViewer.destroy();
      };
    }, [bpmnViewer]);
    
    useEffect(() => {
        (async function () {
            if (processKey) {
                dispatch(setProcessDiagramLoading(true));
                let outpuXML = await fetchDiagram(processKey, tenant)
                dispatch(setProcessDiagramXML(outpuXML))
                dispatch(setProcessDiagramLoading(false));
            } else {
                dispatch(setProcessDiagramLoading(false));
            }
        })();
      return () => {
        dispatch(setProcessDiagramLoading(true));
        dispatch(setProcessDiagramXML(""));
      };
      
    }, [processKey, tenant, dispatch]);
      
    useEffect(() => {
        (async function () {
            if (processInstanceId) {
                let outpuActivities = await getProcessActivities(processInstanceId)
                if(outpuActivities) {
                    dispatch(setProcessActivityData(outpuActivities))
                    dispatch(setProcessActivityLoadError(false));
                } else {
                    dispatch(setProcessActivityData(null))
                    dispatch(setProcessActivityLoadError(true));
                }
            } 
        })();
        return () => {
          dispatch(setProcessActivityData(null));
        };
    }, [processInstanceId, dispatch]);

    useEffect(() => {
      if (diagramXML && bpmnViewer) {
        bpmnViewer.importXML(diagramXML);
      }
    }, [diagramXML, bpmnViewer]);

    useEffect(() => {
      if (diagramXML && bpmnViewer && markers && markers[0]) {
        let marker = markers;
        if (
          (!prevMarkers ||
            (prevMarkers[0] && markers[0].id === prevMarkers[0].id)) &&
          marker != null
        ) {
          setTimeout(() => {
            bpmnViewer &&
              bpmnViewer.get("canvas") &&
              bpmnViewer
                .get("canvas")
                .addMarker({ id: markers[0].activityId }, "highlight");
          }, 0);
        }
      }
    }, [diagramXML, bpmnViewer, markers, prevMarkers]);

    const zoom = () => {
      bpmnViewer.get("zoomScroll").stepZoom(1);
    };

    const zoomOut = () => {
      bpmnViewer.get("zoomScroll").stepZoom(-1);
    };
    const zoomReset = () => {
      bpmnViewer.get("zoomScroll").reset();
    };

    if (isProcessDiagramLoading) {
      return (
        <div className="bpmn-viewer-container">
          <div className="bpm-container">
            <Loading />
          </div>
        </div>
      );
    }
    if (diagramXML === "") {
      return (
        <div className="bpmn-viewer-container">
          <div className="bpm-container">
            <div className="row ">
                <div className={`col-12 no-data`}>No Process Diagram found</div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="bpmn-viewer-container">
          <div
            id="process-diagram-container"
            className="bpm-container grab-cursor"
            ref={containerRef}
          />
        </div>
        <div className="d-flex  justify-content-end btn_zoom">
          <div className="d-flex flex-column">
            <button
              className="mb-3"
              title="Reset Zoom"
              onClick={() => zoomReset()}
            >
                <RestartAltIcon/>
            </button>
            <button title="Zoom In" onClick={() => zoom()}>
              <ZoomInIcon/>
            </button>
            <button title="Zoom Out" onClick={() => zoomOut()}>
              <ZoomOutIcon/>
            </button>
          </div>
        </div>
      </>
    );
  };

export default ProcessDiagram;
