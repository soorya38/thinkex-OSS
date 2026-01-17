"use server";

export async function getWeeklyActiveUsers() {
    try {
        // We strictly need the Personal API Key (starts with phx_) for querying data.
        // Public keys (phc_) are for ingestion only and will return Forbidden.
        const apiKey = process.env.POSTHOG_PERSONAL_API_KEY;

        if (!apiKey) {
            return null;
        }

        const response = await fetch("https://us.posthog.com/api/projects/244201/query/", {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: {
                    "kind": "TrendsQuery",
                    "series": [
                        {
                            "kind": "EventsNode",
                            "math": "dau",
                            "name": "$pageview",
                            "event": "$pageview"
                        }
                    ],
                    "interval": "week",
                    "dateRange": {
                        "date_from": "-90d",
                        "explicitDate": false
                    },
                    "trendsFilter": {
                        "display": "ActionsLineGraph"
                    }
                },
            }),
            next: { revalidate: 3600 } // Revalidate every hour
        });

        if (!response.ok) {
            throw new Error(`PostHog API error: ${response.statusText}`);
        }

        const data = await response.json();

        // The response structure for TrendsQuery typically puts results in 'results' array
        // We want the latest weekly active user count (last data point)
        // Based on the snippet, "math": "dau" inside "interval": "week" approximates WAU

        if (data.results && data.results[0] && data.results[0].data) {
            const seriesData = data.results[0].data;
            // Get the last valid data point (latest week)
            const latestCount = seriesData[seriesData.length - 1];

            if (typeof latestCount === 'number') {
                // Return rounded locale string or just raw
                return latestCount.toLocaleString();
            }
        }

        return null;
    } catch (error) {
        return null;
    }
}
