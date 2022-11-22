"""API endpoints for managing cms repo."""

import base64
import mimetypes
from http import HTTPStatus
import json
import requests
from cmislib.exceptions import UpdateConflictException
from cmislib.model import CmisClient
from flask import current_app, request
from flask_restx import Namespace, Resource
from requests.auth import HTTPBasicAuth
from caseflow.services import DocManageService


# from caseflow.services.external.cmislib.atompub.binding import (
#     AtomPubBinding,
# )
# from caseflow.utils import auth, cors_preflight, profiletime

# keeping the base path same for cmis operations (upload / download) as cmis/

API = Namespace("DMS", description="Document Managment ")


# # @cors_preflight("GET,POST,OPTIONS")
# @API.route("/upload", methods=["POST", "OPTIONS"])
# class CMISConnectorUploadResource(Resource):
#     """Resource for uploading cms repo."""

#     @staticmethod
#     # @auth.require
#     # @profiletime
#     def post():
#         """New entry in cms repo with the new resource."""
#         # cms_repo_url='http://localhost:8080/alfresco/api/-default-/public/cmis/versions/1.1/atom'
#         # cms_repo_username='admin'
#         # cms_repo_password="admin"
#         # print(cms_repo_password)
#         # print(current_app.config)
#         cms_repo_url = current_app.config.get("CMS_REPO_URL") 
#         cms_repo_username =current_app.config.get("CMS_REPO_USERNAME")  
#         cms_repo_password =current_app.config.get("CMS_REPO_PASSWORD") 
#         # print(cms_repo_password)
#         if cms_repo_url is None:
#             return {
#                 "message": "CMS Repo Url is not configured"
#             }, HTTPStatus.INTERNAL_SERVER_ERROR

#         # args = {"binding": AtomPubBinding()}
#         client = CmisClient(cms_repo_url, cms_repo_username, cms_repo_password)
#         repo = client.defaultRepository
#         results = repo.query("select * from cmis:folder where cmis:name = 'uploads'")
#         if len(results) == 0:
#             root_folder = repo.rootFolder
#             uploads = root_folder.createFolder("uploads")
#         else:
#             uploads = repo.getObjectByPath("/uploads")

#         if "upload" not in request.files:
#             return {"message": "No upload files in the request"}, HTTPStatus.BAD_REQUEST

#         contentfile = request.files["upload"]
#         filename = contentfile.filename
#         content_type = mimetypes.guess_type(filename)[0]
#         if filename != "":
#             try:
#                 document = uploads.createDocument(
#                     filename, contentFile=contentfile, contentType=content_type
#                 )
#                 #api_base_url = current_app.config.get("FORMSFLOW_API_URL")
#                 print("Uploaded document details")
#                 # y = json.loads(document)
#                 # print(y)
#                 url = "/cmis/download?name={document.name}"
#                 uploadeddata = DocManageService.doc_upload_mutation(request,document)
#                 return (
#                     (
#                         {  
#                             "objectId": document.getObjectId(),
#                             "name": document.name,
#                             "url": url,
#                         }
#                     ),
#                     HTTPStatus.OK,
#                 )
#             except UpdateConflictException:
#                 return {
#                     "message": "The uploaded file already existing in the repository"
#                 }, HTTPStatus.INTERNAL_SERVER_ERROR
#         else:
#             return {"message": "No upload files in the request"}, HTTPStatus.BAD_REQUEST


# # @cors_preflight("GET,POST,OPTIONS")
# @API.route("/download", methods=["GET", "OPTIONS"])
# class CMISConnectorDownloadResource(Resource):
#     """Resource for downloading files from cms repo."""

#     @staticmethod
#     # @auth.require
#     # @profiletime
#     def get():
#         """Getting resource from cms repo."""
#         cms_repo_url = current_app.config.get("CMS_REPO_URL")
#         cms_repo_username = current_app.config.get("CMS_REPO_USERNAME")
#         cms_repo_password = current_app.config.get("CMS_REPO_PASSWORD")
#         if cms_repo_url is None:
#             return {
#                 "message": "CMS Repo Url is not configured"
#             }, HTTPStatus.INTERNAL_SERVER_ERROR

#         client = CmisClient(cms_repo_url, cms_repo_username, cms_repo_password)
#         repo = client.defaultRepository
#         args = request.args
#         try:
#             results = repo.query(
#                 "select * from cmis:document where cmis:name = '"
#                 + args.get("name")
#                 + "'"
#             )
#             if len(results) == 0:
#                 return {
#                     "message": "No file data found"
#                 }, HTTPStatus.INTERNAL_SERVER_ERROR
#             result = results[0]
#             url = f"{cms_repo_url}/content/{result.name}?id={result.id}"
#             base64_bytes = base64.b64encode(
#                 requests.get(
#                     url, auth=HTTPBasicAuth(cms_repo_username, cms_repo_password)
#                 ).content
#             )
#             base64_string = base64_bytes.decode("utf-8")
#             return [{"name": result.name, "data": base64_string}]
#         except AssertionError:
#             return {"message": "No file data found"}, HTTPStatus.INTERNAL_SERVER_ERROR
#         except BaseException as exc:  # pylint: disable=broad-except
#             current_app.logger.warning(exc)
#             return {
#                 "message": "CMS Repo related Exception occurred"
#             }, HTTPStatus.INTERNAL_SERVER_ERROR

            
# @cors_preflight("GET,POST,OPTIONS")
@API.route("/doc_fetchdata", methods=["GET", "OPTIONS"])
class DocumentFetch(Resource):
    """Resource for fetch document list ."""

    @staticmethod
    # @auth.require
    # @profiletime
    def get():
        """Getting resource from cms repo."""
        try:
            documentList = DocManageService.doc_fetch_alldata()
            return (
                (documentList),
                HTTPStatus.OK,
            )
        except UpdateConflictException:
            return {
                    "message": "The Document List had some error"
                }, HTTPStatus.INTERNAL_SERVER_ERROR

