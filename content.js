let abort = 0

function findGap3() {
	if (abort >= 5) { console.error("Aborted."); clearInterval(interval); return; }
	
	const home = document.querySelector("div.grow");
	const group = document.querySelector("div.flex.gap-3");
	
	if (home == null || group == null) { abort++; console.error("Error: 0x1"); return; }
	
	const download = group.querySelector("a"); 
	const file = download.getAttribute("href");
	
	if (download == null || file == null) {	abort++; console.error("Error: 0x2"); return; } 
	
	console.log("Static region found: ", home);
	console.log("Button group found: ", group);
	console.log("Download button found: ", download);
	
	const free = document.createElement("button");
	free.textContent = "Free Download";
	free.addEventListener("click", () => {
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
	});
	
	home.appendChild(free);
	clearInterval(interval);
}

const interval = setInterval(findGap3, 200);