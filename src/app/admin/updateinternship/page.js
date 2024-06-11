"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useSearchParams } from 'next/navigation'

function UpdateInternship() {
    const [internship, setInternship] = useState(null);
    const [error, setError] = useState(""); 
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const { data: session, status: sessionStatus } = useSession();

    useEffect(() => {
        const fetchInternship = async () => {
            try {
                const res = await fetch(`/api/internships/${id}`);
                const data = await res.json();
                setInternship(data.internshipss);
            } catch (error) {
                console.error("Error fetching internship data:", error);
                setError("Error fetching internship data!");
            }
        };
        if (!id) {
            router.push("/admin/viewinternship");
        }
        if (id) {
            fetchInternship();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const Title = e.target[0].value;
        const Company_title = e.target[1].value;
        const Location = e.target[2].value;
        const EligibilityCriteria = e.target[3].value;
        const Url = e.target[4].value;
        const Duration = e.target[5].value;
        const Description = e.target[6].value;

        try {
            const res = await fetch(`/api/internships/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Title,
                    Company_title,
                    Location,
                    Description,
                    Url,
                    EligibilityCriteria,
                    Duration,
                }),
            });
            if (res.status === 500) {
                const errorData = await res.json();
                setError(errorData.error);
            } else if (res.status === 200) {
                const successData = await res.json();
                setError(successData.message);
                router.push('/admin/viewinternship');
            }
        } catch (error) {
            setError("Error, Try Again!");
            console.error(error);
        }
    };

    if (sessionStatus === "loading" || !internship) {
        return <h1 className="text-gray-700 font-bold text-center m-9 text-2xl">Loading...</h1>;
    }

    return (
        <div className="container mx-auto mt-10 mb-10">
            <h1 className="text-4xl text-center font-extrabold mb-6 text-purple-800">Update Internship</h1>
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md space-y-6">
                <div className="mb-3 mt-3">
                    <label className="font-bold mb-2 p-1">Internship Title</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:shadow-md"
                        placeholder="Internship Title"
                        defaultValue={internship.title || ""}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="font-bold block mb-2 p-1">Company Name</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:shadow-md"
                        placeholder="Company Name"
                        defaultValue={internship.company_title || ""}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="font-bold block mb-2 p-1">Location</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:shadow-md"
                        placeholder="Location"
                        defaultValue={internship.location || ""}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="font-bold block mb-2 p-1">Eligibility Criteria</label>
                    <input
                        type="text"
                        className="form-control w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:shadow-md"
                        placeholder="Eligibility Criteria for Internship"
                        defaultValue={internship.eligibilityCriteria || ""}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="font-bold block mb-2 p-1">Website URL</label>
                    <input
                        type="url"
                        className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:shadow-md"
                        placeholder="Your website URL (optional)"
                        defaultValue={internship.url || ""}
                    />
                </div>
                <div className="mb-4">
                    <label className="font-bold mb-2 p-1">Duration</label>
                    <input
                        type="text"
                        className="form-control w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:shadow-md focus:ring-2 focus:ring-purple-500"
                        placeholder="Internship Duration"
                        defaultValue={internship.duration || ""}
                    />
                </div>
                <div className="mb-4">
                    <label className="font-bold block mb-2 p-1" htmlFor="description">Description</label>
                    <textarea 
                        className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        id="description" rows="4" placeholder="Give a description of the internship"
                        defaultValue={internship.description || ""}
                    ></textarea>
                </div>
                <p className="text-red-500 text-base">{error && error}</p>
                <div className="flex items-center justify-center">
                    <button type="submit" className="py-2 px-8 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition duration-300">
                        Update
                    </button>
                </div>
            </form>
            <div className="pb-5"></div>
        </div>
    );
}

export default UpdateInternship;