import Rx from "rx";

import Router from "./router";

export default class DataSource {

	call(functionPath, args, refSuffixes, thisPaths) {
		return this.subscribe("call", functionPath, args, refSuffixes, thisPaths);
	}

	get(pathSets) {
		return this.subscribe("get", pathSets);
	}

	set(jsonGraphEnvelope) {
		return this.subscribe("set", jsonGraphEnvelope);
	}

	subscribe(method, ...parameters) {
		return Rx.Observable.create((observer) => {
			Router[method](...parameters).subscribe((data) => {
				observer.onNext(data);
				observer.onCompleted();
			});
		});
	}

}
