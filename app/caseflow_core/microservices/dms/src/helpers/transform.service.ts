import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class TransformService {
  transformS3 = (type, document, data) => {
    try {
      switch (type) {
        case 'CREATE':
          return {
            caseId: parseInt(data.caseId),
            documentref: document.key,
            name: data.name,
            desc: data.desc,
            addedbyuserid: data.addedbyuserid,
            creationdate: new Date(),
            dmsprovider: 1,
            latestversion: document.VersionId,
            isdeleted: false,
            type: data?.type,
            size: data?.size,
          };

        case 'UPDATE':
          return {
            documentref: document.key,
            desc: data.desc,
            addedbyuserid: data.addedbyuserid,
            dmsprovider: 1,
            latestversion: document.VersionId,
            isdeleted: false,
          };
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  };

  transformAlfresco = (type, document, data) => {
    try {
      switch (type) {
        case 'CREATE':
          return {
            caseId: data.caseId,
            name: data.name,
            documentref: document.entry.id,
            desc: data.desc,
            addedbyuserid: data.addedbyuserid,
            creationdate: new Date(),
            dmsprovider: 3,
            latestversion: document.entry.properties['cm:versionLabel'],
            isdeleted: false,
            type: data?.type,
            size: data?.size,
          };

        case 'UPDATE':
          return {
            documentref: document.entry.id,
            desc: data.desc,
            addedbyuserid: data.addedbyuserid,
            dmsprovider: 3,
            latestversion: document.entry.properties['cm:versionLabel'],
            isdeleted: false,
          };
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  };

  transformSharepoint = (type, document, data) => {
    try {
      switch (type) {
        case 'CREATE':
          return {
            caseId: data.caseId,
            documentref: document.UniqueId,
            name: data.name,
            desc: data.desc,
            addedbyuserid: data.addedbyuserid,
            creationdate: new Date(),
            dmsprovider: 2,
            latestversion: document.UIVersionLabel,
            isdeleted: false,
            type: data?.type,
            size: data?.size,
          };

        case 'UPDATE':
          return {
            documentref: document.UniqueId,
            desc: data.desc,
            addedbyuserid: data.addedbyuserid,
            dmsprovider: 2,
            latestversion: document.UIVersionLabel,
            isdeleted: false,
          };
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  };

  transformDatabase = (type, data, file) => {
    try {
      switch (type) {
        case 'CREATE':
          return {
            caseId: data.caseId,
            documentref: '',
            name: data.name,
            desc: data.desc,
            addedbyuserid: data.addedbyuserid,
            creationdate: new Date(),
            dmsprovider: 4,
            latestversion: '',
            isdeleted: false,
            type: data?.type,
            size: data?.size,
            file: file,
          };

        case 'UPDATE':
          return {
            documentref: '',
            desc: data.desc,
            addedbyuserid: data.addedbyuserid,
            dmsprovider: 4,
            latestversion:'',
            isdeleted: false,
            file: file,
          };
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  };

  transform = (dms, type, document, data, file) => {
    try {
      switch (dms) {
        case '1':
          return this.transformS3(type, document, data);

        case '2':
          return this.transformSharepoint(type, document, data);

        case '3':
          return this.transformAlfresco(type, document, data);

        case '4':
          return this.transformDatabase(type, data, file);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}
