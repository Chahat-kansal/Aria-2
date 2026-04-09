export default async function handler(req, res) {
  const files = req.body.files;

  const vercelFiles = Object.entries(files).map(([file, data]) => ({
    file,
    data
  }));

  const response = await fetch("https://api.vercel.com/v13/deployments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: "aria-site",
      files: vercelFiles
    })
  });

  const data = await response.json();

  res.json({ url: "https://" + data.url });
}