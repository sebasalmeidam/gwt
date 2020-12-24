class StudentsController < ApplicationController

  def validate_students
    @users = params[:users]
    @current_students = Student.where(torre_username: @users ).map(&:torre_username)
    @students = @users - @current_students

    @new_students = @users.map{|user| {torre_username: user, created_at: DateTime.now, updated_at: DateTime.now}}
    Student.insert_all(@new_students)
    
    render json: {status: 200, mensaje: 'Received'} and return
  end
end