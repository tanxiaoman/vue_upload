<template>
  <div style="width: 90%; margin: 0 auto; border: 2px solid #2c3e50;">
    <nav id="nav">满文识别系统</nav>
    <el-row id="content">
      <el-col :span="10" :xs="24" :sm="24" :md="8" class="leftPart">
        <el-row type="flex" justify="center" class="leftPart-button" :gutter="10">
          <input type="file" accept="image/*" style="display: none" ref="iptFile" @change="onChangeFile" />
          <el-col :span="6" :xs="24" :sm="24" :md="6">
            <el-button type="primary" size="medium" class="button" @click="$refs.iptFile.click()"><i
                class="el-icon-plus el-icon--right" style="margin-right: 5px;"></i>选择图片</el-button>
          </el-col>
          <el-col :span="6" :xs="24" :sm="24" :md="6">
            <el-button type="primary" size="medium" class="button" @click="upload(false)"><i class="el-icon-upload el-icon--right"
                style="margin-right: 5px;"></i>满文识别</el-button>
          </el-col>
          <el-col :span="6" :xs="24" :sm="24" :md="6">
            <el-button type="primary" size="medium" class="button" @click="upload(true)"><i
                class="el-icon-upload el-icon--right" style="margin-right: 5px;"></i>印刷体识别</el-button>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="14" :xs="24" :sm="24" :md="16" class="rightPart">
        <el-image :src="avatar" fit="scale-down" style="height:100%;">
          <div slot="placeholder" class="image-slot">
            <el-image :src="src"></el-image>
          </div>
        </el-image>
      </el-col>
    </el-row>
    <footer id="footer">
      拓展链接：<a target="_blank" href="http://www.manchu.work/home">manchu.work</a>
    </footer>
  </div>
</template>
<script>
export default {
  name: 'UserAvatar',
  data() {
    return {
      uploadUrl: '/upload',
      avatar: require("@/assets/images/manchu.png"),
      dialogVisible: false,
      result: '',
      fileName: 'manchu.png',
    }
  },
  methods: {
    // 获取图片
    onChangeFile(e) {
      const fileList = e.target.files
      if (fileList.length > 0) {
        // 选择了图片
        console.log(fileList[0])
        this.fileName = fileList[0].name
        // 校验图片大小
        const isLt2M = fileList[0].size / 1024 / 1024 < 5
        if (!isLt2M) {
          this.$message.warning('上传的图片大小不能超过5M！')
          return
        }
        // 将图片转化为base64的字符串  FileReader
        const reader = new FileReader()
        // readAsDataURL将文件对象的数据读取到reader中，转化为base64的字符串
        reader.readAsDataURL(fileList[0])
        // load监听读取完成  reader.result
        reader.addEventListener('load', () => {
          //console.log(reader.result)
          this.avatar = reader.result
        })
      } else {
        this.avatar = ''
      }
    },
    upload(isPrinted) {
      //let file = this.$refs.iptFile.files[0]
      if (this.avatar === '' || this.fileName === 'manchu.png') {
        this.$message.warning('请选择图片后再上传！')
        return
      }
      this.handleRotate(this.avatar).then(handleFile => {
        let param = new FormData(); //创建form对象
        param.append('image', handleFile);//通过append向form对象添加数据
        param.append('fileName', this.fileName);
        param.append('isPrinted', isPrinted);
        this.$http.post(this.uploadUrl, param).then(response => {
          if (response.data) {
            this.result = response.data
          }
          this.dialogVisible = true
          console.log('上传成功');

          //  返回结果传递 
          this.$router.push({
            path: '/success',
            query: {
              isSuccess: true,
              result: this.result,
            }
          })
        }).catch(function (error) {
          console.log(error);
          //  返回结果传递 
          this.$router.push({
            path: '/success',
            query: {
              isSuccess: false,
              result: ""
            }
          })
        })
      });
    },
    handleRotate(file) {
      return new Promise((resolve, reject) => {
        const that = this;
        const img = new Image();
        img.src = file;
        img.onload = function () {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          canvas.width = img.height
          canvas.height = img.width
          ctx.translate(canvas.width / 2, canvas.height / 2)
          ctx.rotate((270 * Math.PI) / 180)
          ctx.drawImage(img, -canvas.height / 2, -canvas.width / 2)
          const ndata = canvas.toDataURL('image/jpeg', 1.0)
          resolve(ndata)
        }
      })
    },
    dataURLtoFile(dataurl) {
      var arr = dataurl.split(',')
      var bstr = atob(arr[1])
      var n = bstr.length
      var u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], 'image', {
        type: 'image'
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    }
  }
}
</script>

<style lang="scss" scoped>
#nav {
  height: 60px;
  background-color: #93B874;
  font-family: cursive, Tahoma, Geneva, Verdana, sans-serif;
  font-size: xx-large;
  font-weight: bold;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
}

#content {
  background-color: white;
}

#footer {
  height: 30px;
  background-color: #93B874;
  text-align: end;
  padding-right: 10px;
  padding-top: 10px;
}

.leftPart-button {
  padding-top: 10px;
  padding-bottom: 10px;
}

@media screen and (min-width: 1024px) {
  #content {
    display: flex;
    align-items: center;
  }
}

@media screen and (max-width: 768px){
  .leftPart-button{
    flex-direction: column;
  }
  .leftPart-button div{
    margin-top: 5px;
    margin-bottom: 5px;
  }
}

.rightPart {
  height: 600px;
  background-color: rgb(245, 245, 245)
}
</style>
