import axios from "axios";
import { useEffect, useState } from "react";
import { SpeakerType } from "../models/speaker";

export enum RequestStatus {
  Loading,
  Success,
  Failure,
}

const restUrl = "api/speakers";

export function useRequestRest() {
  const [data, setData] = useState<SpeakerType[]>([]);
  const [requestStatus, setRequestStatus] = useState(RequestStatus.Loading);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get<SpeakerType[]>(restUrl);
        setData(result.data);
        setRequestStatus(RequestStatus.Success);
        setError("");
      } catch (e) {
        setRequestStatus(RequestStatus.Failure);
        setError(e);
      }
    }
    fetchData();
  }, []);

  function updateRecord(record: SpeakerType, doneCallback?: () => void) {
    const originalData = [...data];
    const newRecords = data.map((item) =>
      item.id === record.id ? record : item
    );

    async function delayFunction() {
      try {
        setData(newRecords);
        await axios.put(`${restUrl}/${record.id}`, record);
        if (doneCallback) {
          doneCallback();
        }
      } catch (error) {
        console.error("error thrown inside delayFunction", error);
        if (doneCallback) {
          doneCallback();
        }
        setData(originalData);
      }
    }

    delayFunction();
  }

  function insertRecord(record: SpeakerType, doneCallback?: () => void) {
    const originalData = [...data];
    const newRecords = [record, ...data];

    async function delayFunction() {
      try {
        setData(newRecords);
        await axios.post(`${restUrl}`, record);
        if (doneCallback) {
          doneCallback();
        }
      } catch (error) {
        console.error("error thrown inside delayFunction", error);
        if (doneCallback) {
          doneCallback();
        }
        setData(originalData);
      }
    }

    delayFunction();
  }

  function deleteRecord(record: SpeakerType, doneCallback?: () => void) {
    const originalData = [...data];
    const newRecords = data.filter((item) => item.id !== record.id);

    async function delayFunction() {
      try {
        setData(newRecords);
        await axios.delete(`${restUrl}/${record.id}`);
        if (doneCallback) {
          doneCallback();
        }
      } catch (error) {
        console.error("error thrown inside delayFunction", error);
        if (doneCallback) {
          doneCallback();
        }
        setData(originalData);
      }
    }

    delayFunction();
  }

  return {
    data,
    requestStatus,
    error,
    updateRecord,
    insertRecord,
    deleteRecord,
  };
}
