import { worker_size } from "./bit-lib";

/**
 * @export
 * @class Server
 */

export class Server {
    /**
     * Creates an instance of Server.
     * @param {string} servername
     * @param {import(".").NS } ns
     * @memberof Server
     */
    constructor(servername, ns) {
        this.name = servername;
        this.ram = ns.getServerMaxRam(servername);
        this.cores = ns.getServer(servername).cpuCores;
        // Try to leave an extra 10% free on home
        if (this.name === "home") {
            let cappedRam = Math.floor(this.ram * 0.9);
            this.freeRam = cappedRam - ns.getServerUsedRam(servername);
        } else {
            this.freeRam = this.ram - ns.getServerUsedRam(servername);
        }
        this.rooted = ns.hasRootAccess(servername);
        this.slots = 0;
        if (this.rooted) {
            this.slots = Math.floor(this.freeRam / worker_size);
        }
        this.maxMoney = ns.getServerMaxMoney(servername);
        this.currentMoney = ns.getServerMoneyAvailable(servername);
        this.hackFactor = ns.hackAnalyze(servername);
        this.hackTime = ns.getHackTime(servername);
        this.growTime = ns.getGrowTime(servername);
        this.weakenTime = ns.getWeakenTime(servername);
        this.securityBase = ns.getServerMinSecurityLevel(servername);
        this.securityCurrent = ns.getServerSecurityLevel(servername);
        this.levelRequired = ns.getServerRequiredHackingLevel(servername);
        this.desired = { hack: 0, grow: 0, weaken: 0 };
        this.running = { hack: 0, grow: 0, weaken: 0 };
        this.score = 0;
        this.w = 0;
        this.g = 0;
        this.h = 0;
    }
    update(ns) {
        let servername = this.name;
        this.ram = ns.getServerMaxRam(servername);
        this.freeRam = this.ram - ns.getServerUsedRam(servername);
        this.rooted = ns.hasRootAccess(servername);
        this.slots = 0;
        if (this.rooted) {
            this.slots = Math.floor(this.freeRam / worker_size);
        }
        this.maxMoney = ns.getServerMaxMoney(servername);
        this.currentMoney = ns.getServerMoneyAvailable(servername);
        this.hackFactor = ns.hackAnalyze(servername);
        this.hackTime = ns.getHackTime(servername);
        this.growTime = ns.getGrowTime(servername);
        this.weakenTime = ns.getWeakenTime(servername);
        this.securityBase = ns.getServerMinSecurityLevel(servername);
        this.securityCurrent = ns.getServerSecurityLevel(servername);
        this.levelRequired = ns.getServerRequiredHackingLevel(servername);
    }
    resetRunningServerThreadCounts() {
        this.w = 0;
        this.g = 0;
        this.h = 0;
    }
    resetRunningTargetThreadCounts() {
        this.running = { hack: 0, grow: 0, weaken: 0 };
    }
}
