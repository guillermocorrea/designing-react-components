import { useEffect, useState } from "react";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export enum RequestStatus {
  Loading,
  Success,
  Failure,
}

export function useRequestDelay<T extends { id: string }>(
  delayTime: number,
  initialData: T[] = []
) {
  const [data, setData] = useState(initialData);
  const [requestStatus, setRequestStatus] = useState(RequestStatus.Loading);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        await delay(delayTime);
        // throw "500 Internal error server";
        setData(data);
        setRequestStatus(RequestStatus.Success);
        setError("");
      } catch (e) {
        setRequestStatus(RequestStatus.Failure);
        setError(e);
      }
    }
    fetchData();
  }, []);

  function updateRecord(record: T, doneCallback?: () => void) {
    const originalData = [...data];
    const newRecords = data.map((item) =>
      item.id === record.id ? record : item
    );

    async function delayFunction() {
      try {
        setData(newRecords);
        await delay(delayTime);
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

  function insertRecord(record: T, doneCallback?: () => void) {
    const originalData = [...data];
    const newRecords = [record, ...data];

    async function delayFunction() {
      try {
        setData(newRecords);
        await delay(delayTime);
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

  function deleteRecord(record: T, doneCallback?: () => void) {
    const originalData = [...data];
    const newRecords = data.filter((item) => item.id !== record.id);

    async function delayFunction() {
      try {
        setData(newRecords);
        await delay(delayTime);
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
