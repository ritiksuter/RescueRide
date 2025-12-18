import { useEffect, useState } from "react";
import { MechanicJobList } from "../../components/mechanic/MechanicJobList";
import { getMechanicJobsApi, acceptJobApi } from "../../api/mechanic.api";

export const MechanicJobsPage = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getMechanicJobsApi().then((res) =>
      setJobs(res.data?.data || [])
    );
  }, []);

  return (
    <MechanicJobList
      jobs={jobs}
      onAccept={(id) => acceptJobApi(id)}
    />
  );
};
