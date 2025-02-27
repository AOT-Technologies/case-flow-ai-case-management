import React, { useEffect } from "react";
import "./CaseDetailReference.scss";
import lobConfig from "../../../config/config_data.json";
import { setAdditionalCaseDetails } from "../../../reducers/newCaseReducer";
import { useSelector } from "react-redux";
import { State } from "../../../interfaces/stateInterface";
import { useDispatch } from "react-redux";
import moment from "moment";
import { getCaseAdditionalDetails } from "../../../services/CaseService";

const getDisplayData = (key) => {
  let object = lobConfig.caseDetails.filter(
    (data) => data.databaseIdentifier == key
  );
  return object[0];
};

interface CaseDetailReferenceProps {
  caseId: any;
}

const CaseDetailReference = ({ caseId }: CaseDetailReferenceProps) => {
  const dispatch = useDispatch();
  const selectedCase = useSelector((state: State) => state.cases.selectedCase);
  const additionalCaseDetails = selectedCase.additionalFields;
  // let  additionalCaseDetails = {}
  useEffect(() => {
    if (selectedCase.id) {
      getCaseExtraDetails(selectedCase.id);
      // additionalCaseDetails = selectedCase.lobDetails;
    }
  }, [selectedCase.id]);

  const getCaseExtraDetails = async (id) => {
    let output = await getCaseAdditionalDetails(id);
    if (output) {
      dispatch(setAdditionalCaseDetails(output));
    }
  };
  return (
    <>
      <div className="case-detail-reference-first-row">
        {additionalCaseDetails
          ? Object.keys(additionalCaseDetails)?.map((key, index) => (
              <>
                {additionalCaseDetails[key] && getDisplayData(key) ? (
                  <div key={index}>
                    <div className="item">
                      <h3>{getDisplayData(key)["displayName"]}</h3>
                      <p>
                        {getDisplayData(key)["type"] == "boolean"
                          ? additionalCaseDetails[key] == true
                            ? getDisplayData(key)["trueValueDisplayText"]
                            : getDisplayData(key)["falseValueDisplayText"]
                          : getDisplayData(key)["type"] == "Date"
                          ? moment(additionalCaseDetails[key]).format(
                              "MMMM Do, YYYY"
                            )
                          : additionalCaseDetails[key]}
                      </p>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </>
            ))
          : ""}
      </div>
      {additionalCaseDetails ? (
        <div className="configurable-case-content-section">
          Configurable case content
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default CaseDetailReference;
