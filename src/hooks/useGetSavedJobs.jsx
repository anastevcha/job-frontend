import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSavedJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";

const useGetSavedJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getSavedJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/saved`, {
                    withCredentials: true,
                });
                if (res.data.success) {
                    dispatch(setSavedJobs(res.data.savedJobs));
                }
            } catch (error) {
                console.error(error);
            }
        };
        getSavedJobs();
    }, [dispatch]);
};

export default useGetSavedJobs;