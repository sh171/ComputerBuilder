const config = {
	parent : document.getElementById("parent"),
	url : "https://api.recursionist.io/builder/computers?type="
}

class Computer {
	constructor() {
		this.cpuBrand = null;
		this.cpuModel = null;
		this.cpuBenchmark = null;
		this.gpuBrand = null;
		this.gpuModel = null;
		this.gpuBenchmark = null;
		this.ramBrand = null;
		this.ramModel = null;
		this.ramBenchmark = null;
		this.storageType = null;
		this.storageSize = null;
		this.storageBrand = null;
		this.storageModel = null;
		this.storagebenchmark = null;
	}

	static addBrandData(parts, brand, computer) {
		if (parts === "cpu") computer.cpuBrand = brand;
		else if (parts === "gpu") computer.gpuBrand = brand;
		else if (parts === "ram") computer.ramBrand = brand;
		else if (parts === "hdd" || parts === "ssd") computer.storageBrand = brand;
	}

	static addModelData(parts, model, computer) {
		if (parts === "cpu") computer.cpuModel = model;
		else if (parts === "gpu") computer.gpuModel = model;
		else if (parts === "ram") computer.ramModel = model;
		else if (parts === "hdd" || parts === "ssd") computer.storageModel = model;
	}

	static addStorageTypeAndSize(type, size, computer) {
		computer.storageType = type;
		computer.storageSize = size;
	}

	static addBenchmark(parts, benchmark, computer) {
		if (parts === "cpu") computer.cpuBenchmark = benchmark;
		else if (parts === "gpu") computer.gpuBenchmark = benchmark;
		else if (parts === "ram") computer.ramBenchmark = benchmark;
		else if (parts === "hdd" || parts === "ssd") computer.storagebenchmark = benchmark;
	}
}

class View {

	static createPage(computer) {
		let parent = config.parent;
		parent.innerHTML = 
		`
			<div class="mb-4">
				<div class="bg-dark p-2">
					<h1 class="text-white text-center">Build Your Own Computer</h1>
				</div>
				<div>
					<div class="pt-3">
						<div class="col-12">
							<h4>Step1 : Select Your CPU</h4>
						</div>
						<div class="d-flex flex-wrap">
							<div class="col-sm-12 col-lg-5">
								<label class="font-weight-bold" for="cpuBrand">Brand</label>
								<select class="custom-select" id="cpuBrand">
		                            <option>-</option>
		                        </select>
		                    </div>
		                    <div class="col-sm-12 col-lg-5">
		                    	<label class="font-weight-bold" for="cpuModel">Model</label>
								<select class="custom-select" id="cpuModel">
		                            <option>-</option>
		                        </select>
		                    </div>
	                    </div>
	                </div>
	                <div class="pt-3">
						<div class="col-12">
							<h4>Step2 : Select Your GPU</h4>
						</div>
						<div class="d-flex flex-wrap">
							<div class="col-sm-12 col-lg-5">
								<label class="font-weight-bold" for="gpuBrand">Brand</label>
								<select class="custom-select" id="gpuBrand">
		                            <option>-</option>
		                        </select>
		                    </div>
		                    <div class="col-sm-12 col-lg-5">
		                    	<label class="font-weight-bold" for="gpuModel">Model</label>
								<select class="custom-select" id="gpuModel">
		                            <option>-</option>
		                        </select>
		                    </div>
	                    </div>
	                </div>
	                <div class="pt-3">
						<div class="col-12">
							<h4>Step3 : Select Your Memory Card</h4>
						</div>
						<div class="d-flex flex-wrap">
							<div class="col-sm-12 col-lg-5">
								<label class="font-weight-bold" for="ramNum">How many?</label>
								<select class="custom-select" id="ramNum">
		                            <option>-</option>
		                            <option>1</option>
		                            <option>2</option>
		                            <option>3</option>
		                            <option>4</option>
		                        </select>
		                    </div>
							<div class="col-sm-12 col-lg-5">
								<label class="font-weight-bold" for="ramBrand">Brand</label>
								<select class="custom-select" id="ramBrand">
		                            <option>-</option>
		                        </select>
		                    </div>
		                    <div class="col-sm-12 col-lg-5">
		                    	<label class="font-weight-bold" for="ramModel">Model</label>
								<select class="custom-select" id="ramModel">
		                            <option>-</option>
		                        </select>
		                    </div>
	                    </div>
	                </div>
	                <div class="pt-3">
						<div class="col-12">
							<h4>Step4 : Select Your Storage</h4>
						</div>
						<div class="d-flex flex-wrap">
							<div class="col-sm-12 col-lg-5">
								<label class="font-weight-bold" for="storageType">HDD or SSD</label>
								<select class="custom-select" id="storageType">
		                            <option>-</option>
		                            <option>HDD</option>
		                            <option>SSD</option>
		                        </select>
		                    </div>
		                    <div class="col-sm-12 col-lg-5">
								<label class="font-weight-bold" for="storageSize">Storage</label>
								<select class="custom-select" id="storageSize">
		                            <option>-</option>
		                        </select>
		                    </div>
							<div class="col-sm-12 col-lg-5">
								<label class="font-weight-bold" for="storageBrand">Brand</label>
								<select class="custom-select" id="storageBrand">
		                            <option>-</option>
		                        </select>
		                    </div>
		                    <div class="col-sm-12 col-lg-5">
		                    	<label class="font-weight-bold" for="storageModel">Model</label>
								<select class="custom-select" id="storageModel">
		                            <option>-</option>
		                        </select>
		                    </div>
	                    </div>
	                </div>
				</div>
				<div class="pt-3 col-12">
                    <button type="button" class="btn btn-primary col-2" id="addBtn">Add PC</button>
                </div>
                <div  id="buildComputer"><div>
			</div>
		`;

		let addBtn = document.querySelectorAll("#addBtn")[0];
		addBtn.addEventListener("click", function() {
			Controller.calculatePcScore(computer);
		});
	}
}

class Controller {

	static initPage() {
		let computer = new Computer();
		View.createPage(computer);
		Controller.getData(computer);
	}

	static getData(computer) {
		let cpuBrand = document.getElementById("cpuBrand");
		let cpuModel = document.getElementById("cpuModel");
		let gpuBrand = document.getElementById("gpuBrand");
		let gpuModel = document.getElementById("gpuModel");
		let ramBrand = document.getElementById("ramBrand");
		let ramModel = document.getElementById("ramModel");
		let storageBrand = document.getElementById("storageBrand");
		let storageModel = document.getElementById("storageModel");

		Controller.selectBrand("cpu", cpuBrand, cpuModel, computer);
		Controller.selectBrand("gpu", gpuBrand, gpuModel, computer);
		Controller.selectNumberOfRam("ram", ramBrand, ramModel, computer);
		Controller.selectStorageType(storageBrand, storageModel, computer);
	}

	static selectBrand(parts, brandSelect, modelSelect, computer) {
		fetch(config.url + parts).then(response => response.json()).then(function(data) {
			let brandData = Controller.getBrandData(data);
			brandSelect.innerHTML = "<option>-</option>";
			// if (parts === "ram" || parts === "hdd" || parts === "ssd") modelSelect.innerHTML = "<option>-</option>";
			for (let key in brandData) {
				let option = document.createElement("option");
				option.innerHTML = key;
				option.value = key;
				brandSelect.append(option);
			}

			brandSelect.addEventListener("change", function() {
				Controller.selectModel(parts, brandSelect.value, modelSelect, computer);
			});
		});
	}

	static selectModel(parts, brandName, modelSelect, computer) {
		fetch(config.url + parts).then(response => response.json()).then(function(data) {
			let modelData = Controller.getModelData(data);
			modelSelect.innerHTML = "<option>-</option>";

			// check the modelData[brandName] is undefined or not
			if (!modelData[brandName]) {
            console.error(`No models found for brand: ${brandName}`);
            return; // Early return prevents further processing
        	}

			if (parts === "hdd" || parts === "ssd") {
				let storageSize = document.getElementById("storageSize").value;
				let storageModelList = Controller.getStorageModelData(storageSize, modelData[brandName]);

				// check the modelData[brandName] is undefined or not
				if (!storageModelList) {
			        console.error(`No models found for the selected size and brand: ${brandName}`);
			        return; // Early return prevents further processing
			    }

				for (let i=0; i<storageModelList.length; i++) {
					let option = document.createElement("option");
					option.innerHTML = storageModelList[i];
					option.value = storageModelList[i];
					modelSelect.append(option);
				}
			}

			else if (parts === "ram") {
				let ramNumber = document.getElementById("ramNum").value;
				let modelList = [...new Set(modelData[brandName])];
				let ramModelList = Controller.getRightRamModel(ramNumber, modelList);
				for (let i=0; i<ramModelList.length; i++) {
					let option = document.createElement("option");
					option.innerHTML = ramModelList[i];
					option.value = ramModelList[i];
					modelSelect.append(option);
				}
			}

			else if (parts === "cpu" || parts === "gpu") {
				for (let i in modelData[brandName]) {
					let option = document.createElement("option");
					option.innerHTML = modelData[brandName][i];
					option.value = modelData[brandName][i];
					modelSelect.append(option);
				}
			}

			modelSelect.addEventListener("change", function() {
				Computer.addBrandData(parts, brandName, computer);
				Computer.addModelData(parts, modelSelect.value, computer);

				Controller.getBenchmarkData(parts, modelSelect.value, computer);
				// console.log(computer);
			});

		});
	}

	static selectNumberOfRam(parts, brandSelect, modelSelect, computer) {
		let numberOfRam = document.getElementById("ramNum");
		numberOfRam.addEventListener("change", function() {
			Controller.selectBrand(parts, brandSelect, modelSelect, computer);
		});
	}

	static selectStorageType(brandSelect, modelSelect, computer) {
		let storageType = document.getElementById("storageType");
		storageType.addEventListener("change", function() {
			Controller.selectStorageSize(storageType.value.toLowerCase(), brandSelect, modelSelect, computer);
		});
	}

	static selectStorageSize(parts, brandSelect, modelSelect, computer) {
		fetch(config.url + parts).then(response => response.json()).then(function(data) {
			let storageSize = document.getElementById("storageSize");
			storageSize.innerHTML = "<option>-</option>";
			let storageSizeData = Controller.getstorageSizeData(data);
			for (let i=0; i<storageSizeData.length; i++) {
				let option = document.createElement("option");
				option.innerHTML = storageSizeData[i];
				option.value = storageSizeData[i];
				storageSize.append(option);
			}
			storageSize.addEventListener("change", function() {
				Computer.addStorageTypeAndSize(parts.toUpperCase(), storageSize.value, computer);
				Controller.selectBrand(parts, brandSelect, modelSelect, computer);
			});
		});
	}

	static getBrandData(data) {
		let brandData = {};
		for (let i in data) {
			brandData[data[i].Brand] = data[i].Brand;
		}
		return brandData;
	}

	static getModelData(data) {
		let modelData = {};
		for (let i in data) {
			if (!modelData[data[i].Brand]) modelData[data[i].Brand] = [];
			modelData[data[i].Brand].push(data[i].Model);
		}
		return modelData;
	}

	static getRightRamModel(ramNum, modelList) {
		let pattern = new RegExp(ramNum + 'x');
		let list = [];
		for (let i=0; i<modelList.length; i++) {
			if (pattern.test(modelList[i])) list.push(modelList[i]);
		}
		return list;
	}

	static getStorageModelData(size, modelList) {
		let pattern = new RegExp(size);
		let list = [];
		for (let i=0; i<modelList.length; i++) {
			if (pattern.test(modelList[i])) list.push(modelList[i]);
		}		
		list = [...new Set(list)];
		return list;
	}

	static getstorageSizeData(data) {
        let sizeList = [];
        for (let i in data) {
            let gbMatch = data[i].Model.match(/(\d+)GB/);
            let tbMatch = data[i].Model.match(/(\d+)TB/);

            if (gbMatch) sizeList.push(gbMatch[0]);
            if (tbMatch) sizeList.push(tbMatch[0]);
        }
        
        sizeList = [...new Set(sizeList)];
        sizeList.sort((a, b) => {
            return Controller.convertToGB(a) - Controller.convertToGB(b);
        });
        return sizeList;
    }

    static getBenchmarkData(parts, modelName, computer) {
    	fetch(config.url + parts).then(response => response.json()).then(function(data) {
    		let benchmarkData = {};
    		for (let i in data) {
    			benchmarkData[data[i].Model] = data[i].Benchmark;
    		}
    		let benchmark = benchmarkData[modelName];
    		Computer.addBenchmark(parts, benchmark, computer);
    	});
    }

    static convertToGB(value) {
        let [number, unit] = value.match(/(\d+)(TB|GB)/).slice(1);
        number = parseInt(number, 10);
        if (unit === 'TB') return number * 1024; // convert TB to GB
        return number;
	}

	static calculatePcScore(computer) {
		console.log(computer);
	}
}

Controller.initPage();