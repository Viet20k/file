import {fetcher} from "./Fetcher";

// Categories Course Interfaces
export interface IListCategoriesCourseItemResponse {
  value: number;
  label: string;
}

export interface IListCategoriesCourseResponse {
  response?: {
    data?: IListCategoriesCourseItemResponse[];
  };
}

// Course Interfaces
export interface IListCourseItemResponse {
  class_id: number;
  parentcourseid: number;
  title: string;
  price_new: number;
  discount: number;
  paycode: string;
  price_old: number;
}

export interface IListCourseResponse {
  response: {
    data: IListCourseItemResponse[];
  };
}

// City Interfaces
export interface IListCityItemResponse {
  value: number;
  label: string;
}

export interface IListCityResponse {
  response: {
    data: IListCityItemResponse[];
  };
}
export interface IListDistrictItemResponse {
  value: number;
  label: string;
}

export interface IListDistrictResponse {
  response: {
    data: IListDistrictItemResponse[];
  };
}
export interface IParamsGetDistrict {
  city_id: number | undefined;
}
// Skill Groups Interfaces
export interface IListSkillGroupsItemResponse {
  value: number;
  label: string;
}

export interface IListSkillGroupsResponse {
  response: {
    data: IListSkillGroupsItemResponse[];
  };
}
// get data list departments
export interface IListDataDepartmentItemResponse {
  value: number;
  label: string;
  isLeaf?: boolean;
  children?: IListDataDepartmentItemResponse[];
  loading?: boolean;
}
export interface IListDataListDepartmentsResponse {
  response?: {
    data?: IListDataDepartmentItemResponse[];
  };
}

// get data list roles
export interface IParamsGetRoles {
  id_depart: number | undefined;
}
export interface IListUserItem {
  value?: number;
  label?: string;
  id?: number;
}

export interface IListUserResponse {
  nextCursor: unknown;
  response?: {
    current_page?: number;
    data?: IListUserItem[];
    total?: number;
    next_page_url?: string;
  };
}

export interface IGetDetailUserResponse {
  response?: {
    data?: {
      id?: number;
      fullname?: string;
      birthday?: number;
      address?: string;
      email?: string;
      phone?: string;
    };
  };
}

export interface IGetLinkAutoLoginParams {
  pass_jwt: string;
  user_id: number;
}

export interface IGetLinkAutoResponse {
  response?: {
    auto_login?: string;
  };
}

const path = {
  getListCategoriesCourse: "/common/get-categories-course",
  getListCourse: "/common/get-list-course?category_id=",
  getListCity: "/common/get-city",
  getListDistrict: "/common/get-districts",
  getSkillGroups: "/common/get-skill-groups",
  getListDataDepartments: "/roles/get-department",
  getListDataRoles: "/roles/list",
  getListUsers: "/common/get-list-users",
  getDetailUser: "/auth/get-user",
  getLinkAutoLogin: "/common/auto-login",
};

function getCategoriesCourse(): Promise<IListCategoriesCourseResponse> {
  return fetcher(
    {url: path.getListCategoriesCourse, method: "get"},
    {displayError: true}
  );
}

function getCourse(categoryId: number): Promise<IListCourseResponse> {
  return fetcher({url: path.getListCourse + categoryId, method: "get"});
}

function getCity(): Promise<IListCityResponse> {
  return fetcher({url: path.getListCity, method: "get"});
}

function getDistrict(
  params: IParamsGetDistrict
): Promise<IListDistrictResponse> {
  return fetcher(
    {url: path.getListDistrict, method: "get", params: params},
    {displayError: true}
  );
}

function getSkillGroups(): Promise<IListSkillGroupsResponse> {
  return fetcher({url: path.getSkillGroups, method: "get"});
}

function getListUsers(params: {
  search?: string;
  page?: number;
}): Promise<IListUserResponse> {
  return fetcher({
    url: path.getListUsers,
    method: "get",
    params: {...params, perpage: 50},
  });
}

function getDetailUser(id?: number): Promise<IGetDetailUserResponse> {
  return fetcher({
    url: path.getDetailUser,
    method: "get",
    params: {user_id: id},
  });
}

function getLinkAutoLogin(
  params: IGetLinkAutoLoginParams
): Promise<IGetLinkAutoResponse> {
  return fetcher(
    {
      url: path.getLinkAutoLogin,
      method: "get",
      params: params,
    },
    {displayError: true}
  );
}

// List departments
function getListDataListDepartments(): Promise<IListDataListDepartmentsResponse> {
  return fetcher(
    {url: path.getListDataDepartments, method: "get"},
    {displayError: true}
  );
}
// List Roles

function getListDataListRoles(
  params: IParamsGetRoles
): Promise<IListDataListDepartmentsResponse> {
  return fetcher(
    {url: path.getListDataRoles, method: "get", params: params},
    {displayError: true}
  );
}
function getListDataListPage(params: IListUserItem): Promise<IListUserItem> {
  return fetcher({
    url: "https://64197b16c152063412c30d87.mockapi.io/app",
    method: "get",
    params: params,
  });
}
export {
  getCategoriesCourse,
  getCourse,
  getCity,
  getDistrict,
  getListDataListDepartments,
  getListDataListRoles,
  getSkillGroups,
  getListUsers,
  getDetailUser,
  getLinkAutoLogin,
  getListDataListPage,
};
