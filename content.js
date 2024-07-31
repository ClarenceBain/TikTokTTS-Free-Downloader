function findGap3() {
	const home = document.querySelector("div.grow");
	if(home !== null) {
		console.log("Static region found: ", home);
		
		const free = document.createElement("button");
		free.textContent = "Free Download";
		free.addEventListener("click", () => {
			const group = document.querySelector("div.flex.gap-3");
			if (group !== null) {
				console.log("Button group found: ", group);
				const download = group.querySelector("a");
				if(download !== null) {
					console.log("Download button found: ", download);
					const file = download.attributes[0].nodeValue;
					const file_data64 = file.split(",")[1];	
					const raw_data = atob(file_data64);
					
					const bytes = new Array(raw_data.length);
					for (let i = 0; i < raw_data.length; i++) {
						bytes[i] = raw_data.charCodeAt(i);
					}
					
					const data = new Uint8Array(bytes);
					const blob = new Blob([data], { type: "audio/mp3" });
					
					const mp3 = document.createElement("a");
					mp3.href = URL.createObjectURL(blob);
					mp3.download = "tiktok-text-to-speech.mp3";
					mp3.click();
					
					URL.revokeObjectURL(mp3.href);
				} else {
					console.error("Download button not found..");
				}
			} else {
				console.error("Button group not found..");
			}
		});
		home.appendChild(free);
		clearInterval(interval);
	} else {
		console.warn("Looking for static region..");
	}
}

const interval = setInterval(findGap3, 500);