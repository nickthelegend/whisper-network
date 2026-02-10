export const pinataApiKey = "55458b2c685423d1bf24";
export const pinataSecret = "2a024dc2db12947b3d7b4ca04fa2c725f1a48ddc2272d8e2631eb934903730d4";
export const pinataJwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2NmUzZTMwZi1kMTUxLTQ5YmItOTMxOC1hZDlkMDRhOWQ2OGQiLCJlbWFpbCI6InRlc3Rpbmd0ZXNsYTdAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjU1NDU4YjJjNjg1NDIzZDFiZjI0Iiwic2NvcGVkS2V5U2VjcmV0IjoiMmEwMjRkYzJkYjEyOTQ3YjNkN2I0Y2EwNGZhMmM3MjVmMWE0OGRkYzIyNzJkOGUyNjMxZWI5MzQ5MDM3MzBkNCIsImV4cCI6MTgwMjE3ODg0OH0.vZ1P1Oj9C22VugZYzORmvakmIZKJbSG9o87iwNPtzWo";

export async function uploadToIPFS(content: any) {
  const data = JSON.stringify(content);
  const blob = new Blob([data], { type: "application/json" });
  const formData = new FormData();
  formData.append("file", blob, `whisper-${Date.now()}.json`);

  const metadata = JSON.stringify({
    name: `Whisper Message ${Date.now()}`,
  });
  formData.append("pinataMetadata", metadata);

  const options = JSON.stringify({
    cidVersion: 0,
  });
  formData.append("pinataOptions", options);

  try {
    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${pinataJwt}`,
      },
      body: formData,
    });
    const resData = await res.json();
    return resData.IpfsHash;
  } catch (error) {
    console.error("Error uploading to IPFS: ", error);
    throw error;
  }
}

export async function fetchFromIPFS(hash: string) {
  try {
    const res = await fetch(`https://gateway.pinata.cloud/ipfs/${hash}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching from IPFS: ", error);
    throw error;
  }
}
