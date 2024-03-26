import { Injectable } from '@nestjs/common';

//_____________________Custom Imports_____________________//

import { CreateCaseInput } from 'src/cases/dto/create-case.input';
import { UpdateCaseInput } from 'src/cases/dto/update-case.input';


@Injectable()
export class TransformService {
  // summery : Transform the case api body and create a case database entity
  // Created By : Don Basil Peter
  transformCreateCase = (data) => {
    try {
      const createCaseInput: CreateCaseInput = {
        // name: data.name,
        // desc: data?.description,
        lobid: data?.lobid,
        statusid: data?.statusid,
        typeid: data?.typeid,
        linkedcases: data?.linkedcases,
        creationdate: data?.creationdate,
        completiondate: data?.completiondate,
        lastmodificationdate: data?.lastmodificationdate,
        penduntildate: data?.penduntildate,
        archivedate: data?.archivedate,
        startuserid: data?.startuserid,
        currentownerid: data?.currentownerid,
        involvedparties: data?.involvedparties,
        isdeleted: false,
        lobcaseid : data?.lobcaseid,
        individualid: data?.individualid,
        contactid: data?.contactid,
        phonenumber: data?.phonenumber,
        email: data?.email,
        dateofbirth: data?.dateofbirth,
        city: data?.city,
        region: data?.region,
        issuetype: data?.issuetype,
        caseowner: data?.caseowner,
        describetheissue: data?.describetheissue,
        resolutionsought: data?.resolutionsought,
      };
      return createCaseInput;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // summery : Transform the case api body and create a case database entity
  // Created By : Don Basil Peter
  transformUpdateCase = (data) => {
    try {
      const createCaseInput: UpdateCaseInput = {
        id: data.id,
        lobid: data?.lobid,
        statusid: data?.statusid,
        typeid: data?.typeid,
        linkedcases: data?.linkedcases,
        creationdate: data?.creationdate,
        completiondate: data?.completiondate,
        lastmodificationdate: data?.lastmodificationdate,
        penduntildate: data?.penduntildate,
        archivedate: data?.archivedate,
        startuserid: data?.startuserid,
        currentownerid: data?.currentownerid,
        involvedparties: data?.involvedparties,
        isdeleted: false,
        lobcaseid : data?.lobcaseid,
        individualid: data?.individualid,
        contactid: data?.contactid,
        phonenumber: data?.phonenumber,
        email: data?.email,
        dateofbirth: data?.dateofbirth,
        city: data?.city,
        region: data?.region,
        issuetype: data?.issuetype,
        caseowner: data?.caseowner,
        describetheissue: data?.describetheissue,
        resolutionsought: data?.resolutionsought,
      };
      return createCaseInput;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}
