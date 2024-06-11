import React, { createContext } from "react";
import io from "socket.io-client";
import { serviceApi } from "../../lib/config";

export const socket = io.connect(serviceApi);
export const SocketContext = createContext();