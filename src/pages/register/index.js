import React, { useEffect, useState } from "react";
import API_URL from "../api/config";
import axios from "axios";
import Link from "next/link";

const domain = `${API_URL}`;
const signinUrl = `${domain}/register/api/signin/`;
const signupUrl = `${domain}/register/api/signup/`;
const logoutUrl = `${domain}/register/api/logout/`;

function index() {
  return <></>;
}

export default index;
