import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import * as Accordion from "@radix-ui/react-accordion";
import { ClipLoader } from "react-spinners";

export default function Home() {
  const { owner, repo, commitOid } = useParams();
  const [commitData, setCommitData] = useState({ diff: null, info: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (owner && repo && commitOid) fetchCommitData();
  }, [owner, repo, commitOid]);

  const fetchCommitData = async () => {
    try {
      const [diffRes, infoRes] = await Promise.all([
        axios.get(`http://localhost:5000/repositories/${owner}/${repo}/commits/${commitOid}/diff`),
        axios.get(`http://localhost:5000/repositories/${owner}/${repo}/commits/${commitOid}`),
      ]);
      setCommitData({ diff: diffRes.data, info: infoRes.data[0] });
    } catch (error) {
      console.error("Error fetching commit data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDaysAgo = (dateString) => {
    const daysAgo = Math.floor((new Date() - new Date(dateString)) / (1000 * 60 * 60 * 24));
    return `${daysAgo} days ago`;
  };

  const { diff, info } = commitData;

  return (
    <div className="container mx-auto px-4 py-8 bg-[#FBFDFF]">
      {info && (
        <div className="flex flex-col md:flex-row gap-4 justify-between mb-6 font-arial">
          <div className="flex items-start space-x-4 w-3/5">
            <img
            src={info?.author?.avatar_url}
            alt="Author Avatar"
            className="w-[49px] h-[49px] rounded-full object-cover"
            />
            <div>
              <h2 className="text-base font-bold text-primary">{info.message}</h2>
              <h3 className="text-sm text-lightGrey mt-2">
                Authored by <span className="font-semibold text-[#2B3750]">{info?.author?.name}</span> - {formatDaysAgo(info?.author?.date)}
              </h3>
            </div>
          </div>
          <div className="w-2/5 flex flex-col items-start lg:items-end">
            <p className="text-sm text-secondary">
              Committed by <span className="font-semibold">{info?.committer?.name}</span> {formatDaysAgo(info?.committer?.date)}
            </p>
            <p className="text-sm text-secondary mt-2 font-montserrat">
              Commit <span className="font-semibold">{commitOid}</span>
            </p>
            {info?.parents?.[0]?.oid && (
              <p className="text-sm text-secondary mt-1">
                Parent <span className="text-tertiary">{info.parents[0].oid}</span>
              </p>
            )}
          </div>
        </div>
      )}

      {loading ? (
        <Loader />
      ) : diff?.length === 0 ? (
        <p className="text-gray-500">No file changes detected.</p>
      ) : (
        <Accordion.Root type="multipe" collapsible className="font-arial tracking-4p">
          {diff.map((file, index) => (
            <Accordion.Item key={index} value={`file-${index}`} className="mb-5">
              <Accordion.Header>
                <Accordion.Trigger className="w-full text-left flex gap-3 items-center py-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 7L10 12L15 7" stroke="#6078A9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-sm text-blue-600">{file.headFile?.path}</span>
                </Accordion.Trigger>
              </Accordion.Header>

              <Accordion.Content className="mt-2 pl-4 rounded-lg shadow-sm border border-gray-200">
                {file.hunks?.map((hunk, hunkIndex) => (
                  <div key={hunkIndex} className="hunk mt-2 overflow-auto text-[#657B83]">
                    <pre className="header text-sm text-[#6D84B0] p-2 rounded-t-lg font-bold font-courier">
                      {hunk.header}
                    </pre>
                    <div className="lines font-courier">
                      {hunk.lines?.map((line, lineIndex) => (
                        <pre
                          key={lineIndex}
                          className={`line ${
                            line.content.startsWith("+")
                              ? "bg-successgreen"
                              : line.content.startsWith("-")
                              ? "bg-errorred"
                              : "bg-white"
                          }`}
                        >
                          <span className="line-numbers px-8 text-xs font-bold font-courier">
                            {line.baseLineNumber || "  "} {" "} {line.headLineNumber || "  "}
                          </span>
                          <span className="content text-xs font-bold font-courier">{line.content}</span>
                        </pre>
                      ))}
                    </div>
                  </div>
                ))}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      )}
    </div>
  );
}

const Loader = () => (
  <div className="flex justify-center items-center h-40">
    <ClipLoader size={50} color="#1C7CD6" />
  </div>
);
