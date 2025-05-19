import Dexie, { EntityTable } from "dexie";
import Request from "@/types/request"; // Make sure Request has 'id', 'body', and 'date'

const DB_NAME = "listRequests";

const DB_SCHEMA = "++id, body, date";

const db = new Dexie(DB_NAME) as Dexie & {
  requests: EntityTable<Request, "id">;
};

db.version(1).stores({
  requests: DB_SCHEMA,
});

export default db;
