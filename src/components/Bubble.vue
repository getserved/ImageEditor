<template lang="html">
	<div ref="bubble" class="bubbleDialog" :class="{bubbleUp: isDefault}">
		<section :id="id">
			<div class="flex-container bubble" :class="[bubbleClass]">
				<div class="copy_left">
					<p>{{text}}</p>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
/** Component */
export default {
	props: {
    id: String,
    text: String,
		bubbleClass: String,
		isDefault: Boolean,
		start: Number,
		end: Number
  }
};

</script>

<style lang="scss" scoped>
.bubble {
position: relative;
font-family: sans-serif;
font-size: pxToRem(15);
line-height: 24px;
width: pxToRem(300);
background: #fff;
border-radius: 40px;
padding: 24px;
text-align: center;
color: #000;
}

.bubbleBottomLeft:before {
content: "";
width: 0px;
height: 0px;
position: absolute;
border-left: 24px solid #fff;
border-right: 12px solid transparent;
border-top: 12px solid #fff;
border-bottom: 20px solid transparent;
left: 32px;
bottom: -24px;
}

.bubbleBottomRight:before {
content: "";
width: 0px;
height: 0px;
position: absolute;
border-left: 12px solid transparent;
border-right: 24px solid #fff;
border-top: 12px solid #fff;
border-bottom: 20px solid transparent;
right: 32px;
bottom: -24px;
}

.bubbleTopRight:before {
content: "";
width: 0px;
height: 0px;
position: absolute;
border-left: 12px solid transparent;
border-right: 24px solid #fff;
border-top: 20px solid transparent;
border-bottom: 12px solid #fff;
right: 32px;
top: -24px;
}

.bubbleTopLeft:before {
content: "";
width: 0px;
height: 0px;
position: absolute;
border-left: 24px solid #fff;
border-right: 12px solid transparent;
border-top: 20px solid transparent;
border-bottom: 12px solid #fff;
left: 32px;
top: -24px;
}

</style>
