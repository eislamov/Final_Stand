using System;

public static class NsConstantsCS
{
	public static class  NsSessionsStatus
	{
		public static Guid Planned => Guid.Parse("76bea6fd-a0d3-4974-948f-78e270fbdeac");
		public static Guid InWork => Guid.Parse("0c37e60e-7217-4833-8129-37043c2c7147");
		public static Guid Completed => Guid.Parse("fa464709-be1d-4a42-8671-21b296c861db");
	}
	
	public static class  NsPeriodTreatment
	{
		public static Guid Daily => Guid.Parse("63a408ef-11e5-44b3-a6e0-021616659fd5");
		public static Guid Weekly => Guid.Parse("300f7147-3d3a-409f-8463-ed537e863a9c");
		public static Guid Monthly => Guid.Parse("34795af3-06b8-4cfb-ae21-397374b3cb7e");
	}
}

