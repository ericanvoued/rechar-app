export class DateFormat {
  static format(d: Date): string {
    let oMonth = "0" + (d.getMonth() + 1);
    oMonth = oMonth.slice(-2);
    return d.getFullYear() + "-" + oMonth + "-" + ('0' + d.getDate()).slice(-2);
  }

  static formatCompatible(d: Date): string {
    let oMonth = "0" + (d.getMonth() + 1);
    oMonth = oMonth.slice(-2);
    return d.getFullYear() + "/" + oMonth + "/" + ('0' + d.getDate()).slice(-2);
  }

  static FormatTime(dd: string): string {
    if (dd) {
      let d = new Date(dd.replace(/-/g,'/'));
      let hh = ("0" + d.getHours()).slice(-2);
      let mm = ("0" + d.getMinutes()).slice(-2);
      return `${hh}:${mm}`;
    }

    return '';
  }
}
