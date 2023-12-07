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
}

class View {

	static createPage() {
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
	}
}

class Controller {

	static initPage() {
		let computer = new Computer();
		View.createPage();
		Controller.getData(computer);
	}

	static getData(computer) {
		let cpuBrand = document.getElementById("cpuBrand");
		let cpuModel = document.getElementById("cpuModel");

		Controller.selectBrand("cpu", cpuBrand, cpuModel, computer);
	}

	static selectBrand(parts, brandSelect, modelSelect, computer) {
		fetch(config.url + parts).then(response => response.json()).then(function(data) {
			let brandData = Controller.getBrandData(data);
			for (let key in brandData) {
				// console.log(key)
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
			for (let i in modelData[brandName]) {
				let option = document.createElement("option");
				option.innerHTML = modelData[brandName][i];
				option.value = modelData[brandName][i];
				modelSelect.append(option);
			}
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
}

Controller.initPage();